---
layout: doc
title: prebuilt
---

# `prebuilt`

`vercel build`と`vercel deploy --prebuilt`を使用する為のオプションです。

GitHub Actions側でビルドを行い、そのデータをVercelにデプロイする場合は`true`に設定してください。

## 利点

- GitHub Actions上でビルドを行うことで、Vercel側のビルド時間をゼロにできます

## 使用例

<<< @/snippets/references/inputs/prebuilt.yml
