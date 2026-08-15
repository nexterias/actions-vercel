---
layout: doc
title: prebuilt
description: Enables the vercel build and vercel deploy --prebuilt workflow for builds run in GitHub Actions.
---

# `prebuilt`

This option uses `vercel build` and `vercel deploy --prebuilt`.

Set it to `true` when you build on the GitHub Actions side and deploy that data to Vercel.

::: warning Caution
It will not work unless the software required for building, such as Node.js, is installed correctly.
:::

## Usage example

```yaml file="/snippets/references/inputs/prebuilt.yml"

```
