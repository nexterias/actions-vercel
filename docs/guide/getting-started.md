---
layout: doc
title: はじめる
---

# はじめる

このセクションでは、実際に**nexterias/actions-vercel**を利用してVercelにデプロイを行うための手順について説明します。

[[toc]]

## 必要なもの

- GitHubアカウント
- Vercelアカウント
- Vercel CLI

## リポジトリとVercelプロジェクトの作成

まずは、GitHub上にリポジトリを作成します。

```bash
gh repo create --public --clone example-vercel-project
cd ./example-vercel-project
```

::: info
プライベートリポジトリを作成したい場合は、`--public`フラグを削除して`--private`フラグを付与してください。
:::

次に、Vercel上にプロジェクトを作成します。

```bash
vercel link
```

コマンドが正常に完了していれば、カレントディレクトリ上に`.vercel`というフォルダが作成され、その中に`project.json`が作成されているはずです。

その`project.json`に`projectId`と`orgId`という2つのプロパティが記載されているので、それぞれの値を控えてください。

```bash
# projectId
cat ./vercel/project.json | jq -r '.projectId'

# orgId
cat ./vercel/project.json | jq -r '.orgId'
```

## Vercelのアクセストークンを作成 

[アカウントの設定](https://vercel.com/account/tokens)に移動し、アクセストークンを作成してください。

| 項目 | 説明 |
| --- | --- |
| **NAME** | 任意の名前を入力 |
| **SCOPE** | 作成したVercelプロジェクトがあるチームを選択 |
| **EXPIRATION** | 任意の値を設定 |


上記の項目を埋めて、**Create**を押すとアクセストークンが手に入るので値を控えてください。

### シークレット情報の登録

1. [github,com](https://github.com)からリポジトリのページにアクセス
1. **Settings**タブをクリック
1. **Security**セクションから、**Secrets and variables**をクリック
1. **Secrets**タブをクリック

**New repository secret**から、上記の値を以下のように登録します。

| 名前 | 値 |
| --- | --- |
| `VERCEL_PROJECT_ID` | `projectId`の値 |
| `VERCEL_ORG_ID` | `orgId`の値 |
| `VERCEL_TOKEN ` | 作成したアクセストークン |

## GitHub Actionsの設定

リポジトリに`.github/workflows`ディレクトリを作成し、その中に`vercel.yml`というファイルを下記の内容を書き込んで作成してください。

<<< @/snippets/basic-workflow.yml

これで、GitHub Actionsを利用してVercelにデプロイを行うことができるようになります。

::: tip `GITHUB_TOKEN`の権限
`jobs.*.permissions`で指定している項目について補足

| 権限 | 説明 |
| --- | --- |
| `contents` | `actions/checkout`で必要 |
| `deployments` | デプロイメントを作成、更新する為に`write`に設定 |
| `statuses` | コミットステータスを作成、更新する為に`write`に設定 |
| `pull-requests` | プルリクエストにコメントを作成する為に`write`に設定 |

`contents`を`read`だけに設定しても動作しますが、**VercelのGitHub連携を模倣する機能**が使えなくなります。
:::
