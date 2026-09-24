<div align="center">

# Ink

**A free, gamified Python course that runs entirely in your browser.**

[![CI](https://github.com/indranil122/ink-python/actions/workflows/ci.yml/badge.svg)](https://github.com/indranil122/ink-python/actions/workflows/ci.yml)
[![Code license: MIT](https://img.shields.io/badge/code%20license-MIT-0a0a0a?style=flat-square)](LICENSE)
[![Content license: CC BY-NC-SA 4.0](https://img.shields.io/badge/content%20license-CC%20BY--NC--SA%204.0-0a0a0a?style=flat-square)](CONTENT-LICENSE.md)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Python](https://img.shields.io/badge/Python-3.14%20in%20the%20browser-0a0a0a?style=flat-square)](https://pyodide.org)
[![Live demo](https://img.shields.io/badge/live-demo-0a0a0a?style=flat-square)](https://ink-python.vercel.app)

Eleven tracks. Ninety-two lessons. Seventy-six exercises. Every code sample runs
with a real CPython runtime—no install, no account, no backend.

</div>

---

## Why Ink

Ink is an editorial Python course built like a printed textbook and wired like
an IDE.

- **Content as code.** Lessons are MDX files validated by Zod at build time.
  Citations, exercise ordering, starter functions and test suites are all
  checked before a page can ship.
- **Python that actually runs.** Every code block has a Run button. CPython
  3.14 runs through Pyodide in a Web Worker, so nothing uploads and nothing
  installs.
- **Prove every answer.** Exercises ship with a hardcoded test suite that runs
  in the browser against the learner's code.
- **Progress without an account.** XP, levels, streaks, badges and drafts live
  in `localStorage` and never leave the device.
- **Monochrome by design.** Black on white, hairline rules, serif prose and
  monospace metrics. No colour, no streak-shaming, no dark patterns.
- **Openly sourced.** Every lesson names the works it drew from, with author,
  URL and licence, on the page and on `/credits`.

## Quick start

```bash
git clone https://github.com/indranil122/ink-python.git
cd ink-python
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command                    | What it does                                             |
| -------------------------- | -------------------------------------------------------- |
| `npm run dev`              | Start the development server.                            |
| `npm run build`            | Validate content, index it and export a static site.     |
| `npm start`                | Serve the static export from `out/`.                     |
| `npm run preview`          | Alias for `npm start`.                                   |
| `npm run check`            | Typegen, content validation, format, lint, types, tests. |
| `npm run test`             | Run the Vitest suite once.                               |
| `npm run typecheck`        | TypeScript check with no emit.                           |
| `npm run lint`             | ESLint with the Next.js and TypeScript configs.          |
| `npm run format`           | Format the repository with Prettier.                     |
| `npm run content:validate` | Validate every lesson and exercise frontmatter.          |
| `npm run content:index`    | Generate `public/content-index.json`.                    |

## How it works

```text
content/tracks/<track>/lessons/*.mdx        lesson text, objectives, citations
content/tracks/<track>/exercises/<slug>/    prompt.mdx · starter.py · tests.py
scripts/content/                            validate, index, renumber, audit
scripts/import/                             Exercism converter and promotion
src/app/                                    routes, all prerendered
src/components/                             design system, editor, console
src/lib/pyodide/                            runtime config, worker, test harness
src/lib/gamification/                       XP, levels, streaks, badges
src/lib/progress/                           local progress store
src/db/                                     Drizzle schema, unused in static mode
```

Rendering is fully static. Every lesson and exercise is prerendered at build
time; nothing in the content path is dynamic at request time.

## Quality gates

```bash
npm run check    # typegen, content validation, format, lint, types, tests
npm run build    # validate content, index it, prerender every page
```

A missing citation, a duplicate exercise order, a starter file that does not
define its declared function, or a lesson without sources fails the build.

CI runs the same gates on every push and pull request.

## Deployment

The site exports to static files with `output: "export"` and
`trailingSlash: true`.

```bash
npm run build     # writes out/
npm start         # serves out/ locally on :3000
```

Copy `out/` to any static host—Vercel, Netlify, Cloudflare Pages, GitHub Pages,
S3 or Nginx. The only runtime download is the pinned Pyodide CDN bundle, which
the browser caches.

### Environment variables

Copy `.env.example` to `.env.local` for local overrides.

| Variable                    | Purpose                                                         | Required |
| --------------------------- | --------------------------------------------------------------- | -------- |
| `NEXT_PUBLIC_SITE_URL`      | Absolute URL used for metadata, robots and sitemap.             | No       |
| `NEXT_PUBLIC_SERVER_VERIFY` | Enables server-side verification only if the route is restored. | No       |

## Legal

- Source code is licensed under the [MIT License](LICENSE).
- Original course content is licensed under
  [CC BY-NC-SA 4.0](CONTENT-LICENSE.md).
- Third-party material keeps its original licence and is credited in
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and on `/credits`.
- Read the [privacy policy](PRIVACY_POLICY.md), [terms](TERMS.md) and
  [security policy](SECURITY.md).

## Contributing

Contributions are welcome—bug reports, content corrections, accessibility fixes
and new exercises. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request.

## Status

See [ROADMAP.md](ROADMAP.md) for the curriculum plan, delivery phases and
source licensing table. The published site reports its own build contents at
`/status`.

## Acknowledgements

Ink is built on openly licensed educational work, principally the Exercism
Python track, Python documentation, Py4E, Google's Python Class, freeCodeCamp,
Think Python, Automate the Boring Stuff, CS50, SciPy Lecture Notes and the
Pyodide project. Full credits live on `/credits`.
