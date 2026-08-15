# actions-vercel

[![CI](https://github.com/nexterias/actions-vercel/actions/workflows/ci.yml/badge.svg)](https://github.com/nexterias/actions-vercel/actions/workflows/ci.yml)

Deploy to Vercel with GitHub Actions

## Overview

`nexterias/actions-vercel` is a GitHub Action that deploys Vercel projects from GitHub Actions. By building the project on the GitHub Actions runner when necessary and deploying it to Vercel, it can reduce Vercel-side build time to zero.

## Features

- 🚀 Switch between preview and production deployments.
- 🏗️ Deploy the build result from GitHub Actions with `prebuilt: true`.
- 🔗 Integrate deployments with pull request comments, commit statuses, and GitHub Deployments.
- 🧩 Add custom steps such as tests and notifications before or after deployment.

## Usage

```yml
name: Vercel

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

on:
  push:
  pull_request:

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    permissions:
      contents: read # Required to check out the repository.
      deployments: write # Create and update GitHub Deployments.
      statuses: write # Create and update commit statuses.
      pull-requests: write # Post comments on pull requests.

    steps:
      - uses: actions/checkout@v7

      - uses: nexterias/actions-vercel@v2
        with:
          token: ${{ secrets.YOUR_VERCEL_TOKEN }}
          org-id: ${{ secrets.YOUR_VERCEL_ORG_ID }}
          project-id: ${{ secrets.YOUR_VERCEL_PROJECT_ID }}
          production: ${{ github.ref == 'refs/heads/main' }}
          prebuilt: true # If set to true, build will be performed using GitHub Actions.
```

## Documentation

See the [documentation](https://actions-vercel.nexterias.dev/) for detailed setup instructions and reference information.

## Examples

- [List of projects using actions-vercel](https://github.com/search?q=%22nexterias%2Factions-vercel%22+path%3A.github%2Fworkflows+-is%3Afork+-repo%3Anexterias%2Factions-vercel&type=code)
