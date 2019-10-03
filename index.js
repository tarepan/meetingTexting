// basically same as official sample codes
// [official codes](https://github.com/googleapis/nodejs-speech#using-the-client-library)

const audio_index = "01";
const fs = require("fs");
const file_name = `year_end_meeting_H30-TI-1per1-${audio_index}`;
// const file_name = `test-${audio_index}`;

async function main() {
  // Imports the Google Cloud client library
  const speech = require("@google-cloud/speech");

  // Creates a client
  const client = new speech.SpeechClient();

  // The name of the audio file to transcribe
  // const fileName = './edit/year_end_meeting_H30-TI-1per1-01.flac';
  const fileName = `./edit/${file_name}.flac`;

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString("base64");

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes
  };
  const config = {
    encoding: "FLAC",
    sampleRateHertz: 44100,
    languageCode: "ja-JP"
  };
  const request = {
    audio: audio,
    config: config
  };

  // Detects speech in the audio file
  // sync-recognize
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
  fs.writeFileSync(`./result/raw/${file_name}.txt`, transcription);
}
main().catch(console.error);
