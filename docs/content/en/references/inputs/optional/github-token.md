---
layout: doc
title: github-token
description: Sets a GitHub Personal Access Token or secrets.GITHUB_TOKEN for deployment, status, and pull request operations.
---

# `github-token`

Specify a GitHub Personal Access Token or `secrets.GITHUB_TOKEN`.

By default, **secrets.GITHUB_TOKEN** is used.

::: danger Caution
The value entered for `github-token` is **sensitive information**, so use [Secrets](/guide/getting-started#github-secrets) instead of writing it directly in a file.
:::

## When it is used

Depending on the granted permissions, it performs the following operations.

- Creating and updating commit statuses
- Creating and updating Deployments
- Creating and updating pull request comments

## Required permissions

If the required permissions are not granted, they are skipped and Vercel is deployed as usual. Grant and configure the permissions you need according to your preference.

### For `secrets.GITHUB_TOKEN`

| Permission      | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `deployments`   | Set to `write` when creating and updating Deployments.     |
| `statuses`      | Set to `write` when creating and updating commit statuses. |
| `pull-requests` | Set to `write` when creating pull request comments.        |

```yaml {18-20,31} file="/snippets/references/inputs/github-token.yml"

```

### For a Personal Access Token

The `repo` scope is required.
