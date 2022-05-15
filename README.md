# Tukuoki Summarizer

## 概要

作りおきレシピサイトのつくおきの1週間分まとめてつくるページのURLからレシピの手順を要約するウェブアプリケーションです。

すべてオンメモリで処理するので、情報は残りません

レシピのフローチャートはplantumlを使用して表示しています


## Getting started

### linux server

run build.sh script in the repository base direcotry.

```bash
./build.sh
```

then go to backend directory and run

```bash
cd backend
npm run start
```
you can access 

### docker

docker buildをクローンしたレポジトリのルートディレクトリ上で実行します

```bash
docker build -t tuskuoki-summarizer .
```

ビルドが完了したら以下の用にコマンドを入力すると起動します

```bash
docker run --rm -d --name tsukuoki-summarizer -p 8080:8080 tsukuoki-summarizer:latest
```

## 環境変数

|項目|説明|例|
|---|---|---|
|TS_PLANTUMLE|plantumlのサーバーのURL。指定しない場合は`https://plantuml.com/plantuml`が指定される| `https://plantuml.com/plantuml` |

