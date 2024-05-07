---
layout: doc
title: deployment-status
---

# `deployment-status`

`vercel deploy`を実行し終えた際のステータスが格納されています。

| 型 | 説明 |
| - | - |
| `"QUEUED" \| "BUILDING" \| "ERROR" \| "INITIALIZING" \| "READY" \| "CANCELED"` | デプロイ後のステータスが文字列で格納されています。 |

## 使用例

<<< @/snippets/references/outputs/deployment-status.yml{26,33-34}
