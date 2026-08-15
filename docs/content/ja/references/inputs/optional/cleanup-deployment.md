---
layout: doc
title: cleanup-deployment
description: deleteイベントで削除したGitHubブランチに紐づくVercel Deploymentを削除するオプションです。デフォルトはfalseです。
---

# `cleanup-deployment`

`true`にすると、削除したGitHubブランチに紐づくVercelの[Deployment](https://vercel.com/docs/glossary#deployment)を削除します。デフォルトは**false**です。

::: warning
`delete`イベントをトリガーとするWorkflowで有効なオプションです。`delete`イベント以外ではこのオプションがtrueでも動作しません。
:::

## 使用例

```yaml {18} file="/snippets/cleanup-workflow.yml"

```
