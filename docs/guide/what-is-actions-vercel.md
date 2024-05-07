---
layout: doc
title: ガイド
---

# 概要

**nexterias/actions-vercel**は、GitHub Actionsを使用してVercelにデプロイを行うためのアクションです。

- Vercelのビルド、デプロイまでのプロセスをGitHub Actionsに組み込むことが可能になる
 - GitHub Actionsの良さを活かしたCI/CDを構築できるようになります
- `vercel build`, `vercel deploy --prebuilt`をサポート
  - ビルドをGitHub Actions上で行い、そのデータをVercelにデプロイすることが可能
    - Vercel側のビルド時間をゼロにすることができます
- VercelのGitHub連携機能を模倣的に再現可能
  - プルリクエストが作成、更新された際にプレビューURLを発行し、コメントを作成
  - [コミットステータス](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)の更新
  - [デプロイメント](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)を作成、更新
- `ubuntu-latest`, `macos-latest`, `windows-latest`で動作可能
- Vercelのプロセスの前後で任意の処理を実行可能
  - ビルド前のテストなど
  - デプロイ後の通知、Lighthouseによるスコア計測など

下記のようなワークフローファイルを作成することで、GitHub Actionsを利用してVercelにデプロイを行うことができます。

<<< @/snippets/basic-workflow.yml

## 使用例

- [nexterias/homepage | GitHub](https://github.com/nexterias/homepage)
