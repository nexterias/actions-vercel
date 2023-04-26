# actions-vercel

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

      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - uses: nexterias/actions-vercel@main
        with:
          token: Your Vercel token
          org-id: Your Vercel org id
          project-id: Your Vercel project id
          github-token: ${{ secrets.GITHUB_TOKEN }}
          production: ${{ github.ref == 'refs/heads/main' }}
```
