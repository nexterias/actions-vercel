---
layout: doc
title: prebuilt
---

# `prebuilt`

`vercel build`と`vercel deploy --prebuilt`を使用する為のオプションです。

GitHub Actions側でビルドを行い、そのデータをVercelにデプロイする場合は`true`に設定してください。

::: warning 注意
ビルドに必要なソフトウェア（Node.js等）が正しくインストールされていないと機能しません。
:::

## 使用例

<<< @/snippets/references/inputs/prebuilt.yml
