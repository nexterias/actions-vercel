---
layout: doc
title: deployment-status
description: vercel deployの完了時ステータスを文字列として取得する出力です。デプロイ結果に応じた状態を確認できます。
---

# `deployment-status`

`vercel deploy`を実行し終えた際のステータスが格納されています。

| 型                                                                             | 説明                                               |
| ------------------------------------------------------------------------------ | -------------------------------------------------- |
| `"QUEUED" \| "BUILDING" \| "ERROR" \| "INITIALIZING" \| "READY" \| "CANCELED"` | デプロイ後のステータスが文字列で格納されています。 |

## 使用例

```yaml {26,33-34} file="/snippets/references/outputs/deployment-status.yml"

```
