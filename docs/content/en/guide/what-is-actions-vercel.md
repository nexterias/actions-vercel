---
layout: doc
title: Guide
description: Learn how nexterias/actions-vercel builds and deploys to Vercel from GitHub Actions while reproducing GitHub integration features.
---

# Overview

**nexterias/actions-vercel** is an action for deploying to Vercel with GitHub Actions.

- You can integrate Vercel's build and deployment processes into GitHub Actions.
- You can build CI/CD that takes advantage of GitHub Actions.
- Supports `vercel build` and `vercel deploy --prebuilt`
  - You can build on GitHub Actions and deploy that data to Vercel.
    - This can reduce build time on the Vercel side to zero.
- Can reproduce Vercel's GitHub integration features in an imitative manner
  - Issues preview URLs and creates comments when pull requests are created or updated
  - Updates [commit statuses](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
  - Creates and updates [Deployments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- Works on `ubuntu-latest`, `macos-latest`, and `windows-latest`
- You can run arbitrary processing before and after Vercel processes
  - Tests before building
  - Notifications after deployment and score measurement with Lighthouse

Create a workflow file like the following to deploy to Vercel with GitHub Actions.

```yaml file="/snippets/basic-workflow.yml"

```

## Examples

- [nexterias/homepage | GitHub](https://github.com/nexterias/homepage)
