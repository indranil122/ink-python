# Contributing to Ink

Thanks for helping make a free, honest Python course better.

## Ways to contribute

- Report bugs, broken exercises or accessibility problems.
- Correct factual errors, unclear explanations or missing citations.
- Improve tests, tooling, performance and documentation.
- Submit new exercises that fit an existing track and its source licences.

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) first.

## Development setup

Requirements:

- Node.js 20.9 or newer (Node.js 24 is used in CI).
- npm with the committed lockfile.

```bash
git clone https://github.com/indranil122/ink-python.git
cd ink-python
npm install
npm run dev
```

Before opening a pull request, run:

```bash
npm run check
npm run build
```

`npm run check` covers type generation, content validation, formatting, lint,
type checking and tests. `npm run build` must also succeed because every route
is prerendered.

## Content guidelines

Lessons live in `content/tracks/<track>/lessons/*.mdx`. Exercises live in
`content/tracks/<track>/exercises/<slug>/` with:

- `prompt.mdx` — frontmatter plus the exercise statement.
- `starter.py` — the file the learner edits; it must define the declared
  function or class.
- `tests.py` — a self-contained test suite with `def test_` functions or test
  classes that reference the declared entry point.

Frontmatter is validated by Zod. Every lesson and exercise needs at least one
source with `title`, `author`, `url`, `license` and `licenseUrl`.

Additional rules:

- Do not copy material whose licence is incompatible with this project.
- Keep non-commercial and share-alike terms intact.
- Renumber lessons and exercises after inserting or removing entries.
- Prefer worked examples before rules, and cite claims that are not common
  knowledge.

Useful commands:

```bash
npm run content:validate
npm run content:index
node scripts/content/renumber.mjs
```

## Pull requests

1. Fork the repository and create a branch from `main`.
2. Make focused changes with clear commits.
3. Add or update tests where behaviour changes.
4. Update README, ROADMAP or credits when user-facing behaviour changes.
5. Ensure `npm run check` and `npm run build` pass.
6. Open a pull request using the template and describe the motivation.

By contributing, you agree that:

- Your code contributions are licensed under the [MIT License](LICENSE).
- Your original educational content contributions are licensed under
  [CC BY-NC-SA 4.0](CONTENT-LICENSE.md).
- You have the right to submit the work under those terms.

## Reporting security issues

Do not open a public issue for vulnerabilities. Follow [SECURITY.md](SECURITY.md).
