---
layout: doc
title: cleanup-deployment
description: Deletes Vercel Deployments associated with deleted GitHub branches when a delete event triggers the workflow; defaults to false.
---

# `cleanup-deployment`

When set to `true`, this deletes the Vercel [Deployment](https://vercel.com/docs/glossary#deployment) associated with a deleted GitHub branch. The default is **false**.

::: warning
This option is effective for workflows triggered by the `delete` event. It does not work for events other than `delete`, even when this option is true.
:::

## Usage example

```yaml {18} file="/snippets/cleanup-workflow.yml"

```
