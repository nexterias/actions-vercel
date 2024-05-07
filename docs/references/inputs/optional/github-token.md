---
layout: doc
title: github-token
---

# `github-token`

GitHubのPersonal Access Tokenまたは`secrets.GITHUB_TOKEN`を指定してください。

デフォルトでは、**secrets.GITHUB_TOKEN**を使用します。

::: danger 注意
`github-token`に入力する値は**機密情報**になるので、直接ファイルに記述せず[Secrets](/guide/getting-started#シークレット情報の登録)を利用してください。
:::

## 使用する場面

与えられた権限に応じて、以下のような操作を行います。

- コミットステータスの作成、更新
- Deploymentの作成、更新
- プルリクエストへのコメント作成、更新

## 必要な権限

必要な権限が与えられていない場合は、スルーして通常通りVercelへのデプロイを行う仕組みになっています。お好みに合わせて必要な権限を与えて設定してください。

### `secrets.GITHUB_TOKEN`の場合

| 権限 | 説明 |
| --- | --- |
| `deployments` | デプロイメントを作成、更新する場合は`write`に設定 |
| `statuses` | コミットステータスを作成、更新する場合は`write`に設定 |
| `pull-requests` | プルリクエストにコメントを作成する場合は`write`に設定 |

<<< @/snippets/references/inputs/github-token.yml{18-20,31}

### Personal Access Tokenの場合

`repo`スコープが必要です。
