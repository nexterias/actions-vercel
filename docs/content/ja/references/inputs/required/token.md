---
layout: doc
title: token
description: Vercelのアクセストークンを指定する必須入力です。機密情報はGitHub Secretsに安全に保存してください。
---

# `token`

Vercelのアクセストークンを入力してください。この項目は**必須**です。

::: tip
アクセストークンの作成方法については、[こちらのセクション](/guide/getting-started#vercel-access-token)を参照してください。
:::

::: danger 注意
`token`に指定する値は機密情報となるので、公開リポジトリには記載しないで[Secrets](/guide/getting-started#github-secrets)を利用してください。
:::

## 使用例

```yaml {27} file="/snippets/basic-workflow.yml"

```
