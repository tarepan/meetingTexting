const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const speech = require("@google-cloud/speech");

// settings
//// storage
const bucketName = "waseda001";
const isNewBucket = false;
//// audio
const encoding = "FLAC";
const sampleRateHertz = 44100;
const languageCode = "ja-JP";
//// data
const audio_index = "19";
// const fileName = `year_end_meeting_H30-TI-1per1-${audio_index}`;
const fileName = `reguratory__TI_1per1-${audio_index}`;

// const fileName = `test-${audio_index}`;
const baseName = `${fileName}.flac`;
// const filePath = `edit/${fileName}.flac`;
const filePath = `edit/regs/${fileName}.flac`;

const uri = `gs://${bucketName}/${fileName}.flac`;

// Init clients
const storage = new Storage();
const client = new speech.v1.SpeechClient({});

// Prepare blocks
const request = {
  audio: {
    uri: uri
  },
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  }
};

async function main() {
  // Generate bucket
  const myBucket = isNewBucket
    ? await storage.createBucket(bucketName)
    : storage.bucket(bucketName);
  const file = myBucket.file(baseName);

  // Reads a local audio file and converts it to base64
  const contents = fs.readFileSync(filePath);

  await file.save(contents);

  // STT
  const res = await client.longRunningRecognize(request);
  const [operation, initialApiResponse] = res;
  //   // Operation#promise starts polling for the completion of the LRO.
  const res2 = await operation.promise();
  const transcription = res2[0].results
    .map(result => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
  fs.writeFileSync(`./result/raw/${fileName}.txt`, transcription);
  return;
}

main().catch(err => {
  console.error(err);
});
