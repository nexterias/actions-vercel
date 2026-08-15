# actions-vercel

[![CI](https://github.com/nexterias/actions-vercel/actions/workflows/ci.yml/badge.svg)](https://github.com/nexterias/actions-vercel/actions/workflows/ci.yml)

Deploy to Vercel with GitHub Actions

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
      contents: read
      deployments: write
      statuses: write
      pull-requests: write

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

## Examples

- [List of projects using actions-vercel](https://github.com/search?q=%22nexterias%2Factions-vercel%22+path%3A.github%2Fworkflows+-is%3Afork+-repo%3Anexterias%2Factions-vercel&type=code)
