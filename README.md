# actions-vercel

[![CI](https://github.com/nexterias/actions-vercel/actions/workflows/ci.yml/badge.svg)](https://github.com/nexterias/actions-vercel/actions/workflows/ci.yml)

Vercel deploy from GitHub Actions

## Usage

```yml
name: Deploy

on:
  push:
  pull_request:

jobs:
  homepage:
    name: Homepage
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
      statuses: write

    steps:
      - uses: actions/checkout@v3
      
      - uses: nexterias/actions-vercel@main
        with:
          token: Your Vercel token
          org-id: Your Vercel org id
          project-id: Your Vercel project id
          github-token: ${{ secrets.GITHUB_TOKEN }}
          production: ${{ github.ref == 'refs/heads/main' }}
```
