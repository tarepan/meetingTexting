# 文字起こし

## 状況

なんかコードがある  
ぶつ切り化用のコードは動いてるぽい？  
request 用のコードもあるので、動いている…?

error でうまくいかないケースを考えると全長 x hours を一発でいれずに切り刻むのは理にかなっている.

## raw data & preprocessing

元データ: .m4a  
GoogleSTT 用に.flac 化

> ffmpeg -i input.m4a -f flac output.flac

切り方  
原始的だけど、audacity のトラック分離出力を手動.

## STT

[記事](https://tarepan.hatenablog.com/entry/2019/09/25/084930)

```
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\tarep\Desktop\gcpcredentials.json"
```
