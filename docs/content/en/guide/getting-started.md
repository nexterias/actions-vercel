---
layout: doc
title: Get Started
description: Set up a GitHub repository, Vercel project, access token, and repository secrets to start deploying with GitHub Actions.
---

# Get Started

This section explains the steps for actually using **nexterias/actions-vercel** to deploy to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account
- Vercel CLI

## Create a Repository and Vercel Project {#vercel-project}

First, create a repository on GitHub.

```bash
gh repo create --public --clone example-vercel-project
cd ./example-vercel-project
```

::: info
To create a private repository, remove the `--public` flag and add the `--private` flag.
:::

Next, create a project on Vercel.

```bash
vercel link
```

If the command completes successfully, a folder named `.vercel` should be created in the current directory, and `project.json` should be created inside it.

The `project.json` file contains two properties, `projectId` and `orgId`. Record each value.

```bash
# projectId
cat ./vercel/project.json | jq -r '.projectId'

# orgId
cat ./vercel/project.json | jq -r '.orgId'
```

## Create a Vercel Access Token {#vercel-access-token}

Go to [Account Settings](https://vercel.com/account/tokens) and create an access token.

| Field          | Description                                             |
| -------------- | ------------------------------------------------------- |
| **NAME**       | Enter any name                                          |
| **SCOPE**      | Select the team that has the Vercel project you created |
| **EXPIRATION** | Set any value                                           |

After filling in the fields above and clicking **Create**, you will receive an access token. Record its value.

### Register Secret Information {#github-secrets}

1. Go to the repository page from [github,com](https://github.com)
1. Click the **Settings** tab
1. In the **Security** section, click **Secrets and variables**
1. Click the **Secrets** tab

Register the values above from **New repository secret** as follows.

| Name                | Value                |
| ------------------- | -------------------- |
| `VERCEL_PROJECT_ID` | Value of `projectId` |
| `VERCEL_ORG_ID`     | Value of `orgId`     |
| `VERCEL_TOKEN `     | Created access token |

## Configure GitHub Actions

Create a `.github/workflows` directory in your repository, then create a file named `vercel.yml` in it with the following contents.

```yaml file="/snippets/basic-workflow.yml"

```

You can now deploy to Vercel with GitHub Actions.

::: tip `GITHUB_TOKEN` Permissions
Additional information about the items specified in `jobs.*.permissions`:

| Permission      | Description                                         |
| --------------- | --------------------------------------------------- |
| `contents`      | Required by `actions/checkout`                      |
| `deployments`   | Set to `write` to create and update deployments     |
| `statuses`      | Set to `write` to create and update commit statuses |
| `pull-requests` | Set to `write` to create comments on pull requests  |

It also works when `contents` is set to only `read`, but the **features that imitate Vercel's GitHub integration** become unavailable.
:::
