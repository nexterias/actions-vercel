---
layout: doc
title: deployment-status
description: Deployment status after vercel deploy completes, provided as a string output.
---

# `deployment-status`

The status after `vercel deploy` finishes is stored here.

| Type                                                                           | Description                                  |
| ------------------------------------------------------------------------------ | -------------------------------------------- |
| `"QUEUED" \| "BUILDING" \| "ERROR" \| "INITIALIZING" \| "READY" \| "CANCELED"` | The deployment status is stored as a string. |

## Example

```yaml {26,33-34} file="/snippets/references/outputs/deployment-status.yml"

```
