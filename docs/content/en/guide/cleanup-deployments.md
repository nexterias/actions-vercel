---
layout: doc
title: Delete Deployments for Deleted Branches
description: Automatically delete Vercel Deployments associated with deleted GitHub branches by using a GitHub Actions cleanup workflow.
---

# Delete Deployments for Deleted Branches

When you delete a GitHub branch, you can automatically delete the Vercel [Deployment](https://vercel.com/docs/glossary#deployment) associated with that branch.

This feature is enabled only when the event is `delete` and `cleanup-deployment` is set to `true`.

Create the following workflow in `.github/workflows/cleanup-deployments.yml` in your repository.

```yaml file="/snippets/cleanup-workflow.yml"

```

Place this workflow file on your repository's default branch.

## Deployments to Be Deleted

- Deletes Deployments associated with the deleted GitHub branch from the specified Vercel Project.
- Does not delete [Production Deployments](https://vercel.com/docs/glossary#production-deployment).
- This workflow does not run when a tag is deleted.
