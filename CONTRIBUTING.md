# Contributing

Thank you for contributing to actions-vercel. Keep contributions focused, explain why each change is needed, and include enough information for maintainers to review it.

## Open an issue

Search the existing issues before opening a new one.

- Use the bug report template for reproducible behavior that does not work as expected.
- Use the feature request template for new behavior or improvements.
- Use a blank issue for documentation, questions, or topics that do not fit either template.

Never include Vercel tokens, GitHub tokens, project IDs, organization IDs, or other secrets in an issue, workflow, screenshot, or log.

## Set up the development environment

Use Node.js 24 and pnpm 11. The exact versions used by the repository are declared in `.tool-versions` and the `packageManager` field in `package.json`.

Fork and clone the repository, create a focused branch from the latest `main` branch, and install the dependencies:

```sh
pnpm install --frozen-lockfile
```

## Make changes

- Keep each change limited to one concern.
- Match the style of the surrounding code and documentation.
- Update the documentation when user-facing behavior changes.
- Do not edit files in `dist/`. CI rebuilds and commits those generated files after a change is merged.

## Verify changes

Run all repository checks before opening a pull request:

```sh
pnpm lint
pnpm fmt:check
pnpm build
```

Resolve every error or warning caused by your changes.

## Write commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Use one of the commit types configured by this repository: `feat`, `fix`, `docs`, `perf`, `refactor`, `style`, `test`, or `chore`.

Examples:

```text
fix: handle failed Vercel deployments
docs: clarify prebuilt deployments
```

## Open a pull request

Open pull requests against `main`. In the pull request description:

- Explain the problem and the chosen solution.
- Link related issues.
- List the checks you ran.
- Note any documentation changes or explain why none are needed.

Keep the pull request focused and make sure all required checks pass.
