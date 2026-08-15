---
layout: doc
title: 削除済みブランチのPreview Deploymentを削除する
---

# 削除済みブランチのPreview Deploymentを削除する

GitHubのブランチを削除したとき、そのブランチに紐づくVercelの[Preview Deployment](https://vercel.com/docs/glossary#preview-deployment)を自動的に削除できます。

リポジトリの`.github/workflows/cleanup-deployments.yml`に、次のワークフローを作成してください。

```yaml file="/snippets/cleanup-workflow.yml"

```

このワークフローファイルは、リポジトリのデフォルトブランチに配置してください。

ワークフローは、ブランチの`delete`イベントで実行されます。

削除専用のinputを追加する必要はありません。

このワークフローではDeploymentを作成しないため、Deploymentに関するoutputも設定されません。

## 削除対象となるDeployment

指定したVercel Projectから、削除したGitHubブランチに紐づくPreview Deploymentを削除します。

削除対象はPreview Deploymentに限られ、[Production Deployment](https://vercel.com/docs/glossary#production-deployment)は削除しません。

タグの削除では、このワークフローは実行されません。

削除対象となるPreview Deploymentがなくても、ワークフローは成功します。

## フォークと同名ブランチの再作成

フォーク側でブランチを削除しても、ベースリポジトリに配置したワークフローは実行されません。

削除ワークフローが完了する前に同名のブランチを再作成すると、新しいPreview Deploymentも削除される場合があります。

同名のブランチは、削除ワークフローの完了後に再作成してください。
