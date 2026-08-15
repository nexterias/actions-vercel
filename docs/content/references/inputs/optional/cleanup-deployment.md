---
layout: doc
title: cleanup-deployment
---

# `cleanup-deployment`

`true`にすると、削除したGitHubブランチに紐づくVercelの[Deployment](https://vercel.com/docs/glossary#deployment)を削除します。デフォルトは**false**です。

GitHubの`delete`イベントで使用してください。それ以外のイベントでは、Deploymentの実行方法に影響しません。

## 使用例

```yaml {18} file="/snippets/cleanup-workflow.yml"

```
