---
layout: doc
title: cwd
description: Sets the project root directory used by actions-vercel; by default, it uses the value from process.cwd().
---

# `cwd`

This option specifies the path to the project's root directory.

::: info
By default, it uses the value obtained from [`process.cwd()`](https://nodejs.org/docs/latest-v20.x/api/process.html#processcwd).
:::

::: tip For users with a monorepo
When using a pnpm workspace or similar setup, running actions-vercel with each project's directory specified in `cwd` may prevent dependencies from being installed correctly. For details, see [Using a monorepo](/guide/monorepo).
:::

## Usage example

```yaml {31} file="/snippets/references/inputs/cwd.yml"

```
