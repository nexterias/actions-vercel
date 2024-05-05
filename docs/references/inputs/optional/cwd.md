---
layout: doc
title: cwd
---

# `cwd`

プロジェクトのルートディレクトリのパスを指定できるオプションです。

::: info
デフォルトは[`process.cwd()`](https://nodejs.org/docs/latest-v20.x/api/process.html#processcwd)から取得した値を使用します。
:::

::: tip Monorepoを採用している方へ
pnpm workspace等を利用している場合、`cwd`に各プロジェクトのディレクトリを指定してactions-vercelを実行してしまうと、適切に依存関係をインストールできない可能性があります。詳細は[Monorepoを使用する](/guide/monorepo)を参照してください。
:::

## 使用例

<<< @/snippets/references/inputs/cwd.yml{31}
