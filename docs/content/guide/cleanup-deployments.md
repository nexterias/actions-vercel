---
layout: doc
title: 削除したブランチのDeploymentを削除する
---

# 削除したブランチのDeploymentを削除する

GitHubのブランチを削除したとき、そのブランチに紐づくVercelの[Deployment](https://vercel.com/docs/glossary#deployment)を自動的に削除できます。

リポジトリの`.github/workflows/cleanup-deployments.yml`に、次のワークフローを作成してください。

```yaml file="/snippets/cleanup-workflow.yml"

```

このワークフローファイルは、リポジトリのデフォルトブランチに配置してください。

ワークフローは、ブランチの`delete`イベントで実行されます。

削除専用のinputを追加する必要はありません。

このワークフローではDeploymentを作成しないため、Deploymentに関するoutputも設定されません。

## 削除対象となるDeployment

指定したVercel Projectから、削除したGitHubブランチに紐づくDeploymentを削除します。

[Production Deployment](https://vercel.com/docs/glossary#production-deployment)は削除しません。

タグの削除では、このワークフローは実行されません。
