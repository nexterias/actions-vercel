---
layout: doc
title: token
description: Required Vercel access token input. Store this sensitive value securely in GitHub Secrets.
---

# `token`

Enter the Vercel access token. This input is **required**.

::: tip
For information on creating an access token, see [this section](/guide/getting-started#vercel-access-token).
:::

::: danger Caution
The value specified for `token` is sensitive. Do not include it in public repositories; use [Secrets](/guide/getting-started#github-secrets).
:::

## Example

```yaml {27} file="/snippets/basic-workflow.yml"

```
