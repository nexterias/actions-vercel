---
layout: doc
title: 削除したブランチのDeploymentを削除する
description: 削除した GitHub ブランチに紐づく Vercel Deployment を、GitHub Actions で安全に自動削除する方法を説明します。
---

# 削除したブランチのDeploymentを削除する

GitHubのブランチを削除したとき、そのブランチに紐づくVercelの[Deployment](https://vercel.com/docs/glossary#deployment)を自動的に削除できます。

この機能は`delete`イベントかつ`cleanup-deployment`を`true`に設定しなければ有効になりません。

リポジトリの`.github/workflows/cleanup-deployments.yml`に、次のワークフローを作成してください。

```yaml file="/snippets/cleanup-workflow.yml"

```

このワークフローファイルは、リポジトリのデフォルトブランチに配置してください。

## 削除対象となるDeployment

- 指定したVercel Projectから、削除したGitHubブランチに紐づくDeploymentを削除します。
- [Production Deployment](https://vercel.com/docs/glossary#production-deployment)は削除しません。
- タグの削除では、このワークフローは実行されません。
