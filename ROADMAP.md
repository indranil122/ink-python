# Ink — Roadmap

A complete, gamified Python course: zero to professional, every lesson hardcoded in
this repository, every example runnable in the browser, every source cited.

Status legend: **Done** · **Ready** · **In progress** · **Planned**

---

## 1. Product principles

| Principle                   | Meaning                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Content is code             | Lessons, exercises and tests are files in `content/`, validated at build. No CMS, no content database, no runtime fetching.                |
| Readable without an account | Every lesson and exercise is public. Accounts only add sync, streaks, badges and leaderboard rank.                                         |
| One runtime, one truth      | The browser runs CPython 3.14 via Pyodide and executes the same test suite before XP is recorded.                                          |
| Monochrome, editorial       | Black on white, hairlines, serif prose, mono metrics. No colour anywhere. Gamification is expressed through typography, weight and motion. |
| Every claim is cited        | Each lesson lists the works it drew on, with author, URL and license.                                                                      |

---

## 2. Curriculum

95 lessons, 150 exercises, 5,800 XP across eleven ordered tracks.

### Track 1 — Foundations · 10 lessons · 18 exercises · 650 XP · **Published**

1. What Python Is · 2. Your First Program · 3. Values and Types · 4. Variables and
   Names · 5. Numbers and Arithmetic · 6. Strings and Text · 7. Booleans and
   Comparisons · 8. Making Decisions · 9. Repeating Work · 10. Reading Errors and Docs

Exercises: greet, to-fahrenheit, is-even, count-vowels, largest, initials, leap-year,
reverse-a-string, sum-of-digits, fizzbuzz, palindrome-check, grade-classifier,
shopping-total, temperature-summary, letter-frequency, first-word, word-lengths,
last-character

### Track 2 — Data Structures · 9 lessons · 15 exercises · 565 XP · **Lessons published**

1. Lists in Depth · 2. Tuples and Immutability · 3. Dictionaries · 4. Sets and
   Membership · 5. Mutability, Aliasing, Copying · 6. Nested Structures ·
2. Comprehensions · 8. Unpacking and Star · 9. Choosing the Right Structure

Exercises: second-largest, unique-in-order, invert-dict, group-by-length, top-n-dict,
deep-get, plus six imported from Exercism: leap, triangle, grains, bob, raindrops,
darts. Still to write: rotate-list, flatten-once, merge-counts, word-frequency,
matrix-transpose, chunk-list, range-summary, tuple-swap, set-operations

### Track 3 — Functions & Modules · 9 lessons · 16 exercises · 590 XP

1. Defining Functions · 2. Parameters and Arguments · 3. Return Values and Scope ·
2. Docstrings · 5. Lambdas and First-Class Functions · 6. Higher-Order Functions ·
3. Recursion · 8. Modules and Imports · 9. Writing and Importing Modules

Exercises: repeat-string, clamp, counter-closure, memoized-fibonacci, flatten-deep,
apply-twice, is-palindrome-function, word-length-map, average, safe-divide, keyword-only,
accumulate, compose, partial-application, module-export, package-layout

### Track 4 — Object-Oriented Python · 9 lessons · 14 exercises · 540 XP

1. Why Objects · 2. Classes and Instances · 3. Attributes and Methods ·
2. Dunder Methods · 5. Properties and Validation · 6. Inheritance vs Composition ·
3. Dataclasses · 8. Iterables, Iterators and Generators · 9. Designing Errors

Exercises: rectangle, bank-account, money-value, playing-card, stack, queue, iterable-
class, dataclass-model, shape-hierarchy, equality-class, comparison-class, iterable-
generator, composition-over-inheritance, custom-error

### Track 5 — Errors, Debugging & Testing · 8 lessons · 12 exercises · 480 XP

1. Anatomy of an Exception · 2. Raising and Catching · 3. Custom Exceptions ·
2. Reading Tracebacks · 5. Assertions · 6. Writing Tests · 7. Test-Driven Development ·
3. Debugging and Logging

Exercises: retry-on-failure, safe-parse, validate-age, fail-fast, unit-tests-basics,
pytest-basics, bug-hunt, regression-test, exception-hierarchy, logging-basics,
assert-contract, fixture-data

### Track 6 — Files, Serialization & Regex · 8 lessons · 14 exercises · 530 XP

1. Reading and Writing Text · 2. Encodings · 3. Paths with pathlib · 4. CSV ·
2. JSON · 6. Regular Expressions · 7. Binary Files · 8. Archives

Exercises: word-count-file, csv-to-dict, json-roundtrip, log-parser, slugify, extract-
emails, validate-date-string, csv-summary, merge-reports, file-hash, path-glob, archive-
list, encoding-fix, templating-regex

### Track 7 — Stdlib & Tooling · 9 lessons · 14 exercises · 540 XP

1. itertools · 2. collections · 3. datetime and Timezones · 4. argparse CLIs ·
2. Logging Properly · 6. Virtual Environments and pip · 7. pyproject and Packaging ·
3. Type Hints and mypy · 9. Code Quality Tooling

Exercises: sliding-window, counter-top, timezone-convert, cli-greeter, log-formatter,
requirements-file, build-metadata, type-hints-basics, chunk-iterator, group-anagrams,
dedupe-order, retries, env-config, format-check

### Track 8 — Concurrency & Async · 7 lessons · 10 exercises · 420 XP

1. Why Concurrency · 2. Threads and Locks · 3. Processes · 4. asyncio Basics ·
2. Concurrent IO with asyncio · 6. Task Groups and Cancellation · 7. Async Project

Exercises: threaded-downloader, lock-counter, parallel-map, async-sleep, gather-basics,
timeout-handler, cancel-task, producer-consumer, cpu-vs-io, async-pipeline

### Track 9 — Data with NumPy & Pandas · 9 lessons · 14 exercises · 540 XP

1. NumPy Arrays · 2. Indexing and Broadcasting · 3. DataFrames · 4. Loading and
   Cleaning · 5. Grouping and Aggregation · 6. Merging and Joining · 7. Matplotlib ·
2. Time Series · 9. End-to-End Data Project

Exercises: array-stats, broadcasting-calc, filter-rows, missing-values, group-aggregate,
merge-tables, plot-basics, time-series-resample, top-n-dimension, dataframe-cleanup,
pivot-table, correlation-101, csv-to-report, data-quality-report

### Track 10 — Web & APIs · 9 lessons · 12 exercises · 490 XP

1. How HTTP Works · 2. Your First FastAPI App · 3. Routing and Validation ·
2. Databases and SQL · 5. Talking to Postgres · 6. Authentication and Authorization ·
3. Background Work · 8. Testing APIs · 9. Deploying an API

Exercises: first-endpoint, query-parameters, request-model, crud-endpoints, sql-basics,
join-queries, db-transaction, api-auth, api-tests, rate-limit, background-job, deploy-
checklist

### Track 11 — Capstone Projects · 8 lessons · 11 exercises · 455 XP

1. Choosing and Sizing a Project · 2. CLI Tool · 3. Data Pipeline · 4. API Service ·
2. Automation Project · 6. Refactoring Someone Else's Code · 7. Profiling and
   Performance · 8. Shipping and Presenting

Exercises: project-plan, cli-milestone, pipeline-milestone, api-milestone, automation-
milestone, refactor-exercise, profile-improve, readme-quality, demo-script, retrospective,
ship-checklist

---

## 3. Gamification

| Rule              | Value                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lesson XP         | 10                                                                                                                                                |
| Exercise XP       | 25                                                                                                                                                |
| No-hints bonus    | 15                                                                                                                                                |
| Module completion | 100                                                                                                                                               |
| Daily activity    | 5 + 5 × streak day, capped at 50                                                                                                                  |
| Level curve       | `xpToReachLevel(n) = 100 · (n−1)^1.5`, fifty levels                                                                                               |
| Streak            | Daily activity, one grace freeze per miss, timezone-aware                                                                                         |
| Badges            | 12: First Light, Seven, Thirty, Century XP, Module Master ×N, Bug Squasher, No-Hints, Speedrunner, Polyglot, Data Touched, Async Native, Capstone |
| Leaderboard       | Weekly (Mon 00:00 UTC) and all-time, top 100; shared ranks use server-verified XP once accounts ship                                              |
| Integrity         | XP is recorded after the same tests pass; with accounts enabled, a server re-run writes an append-only ledger with idempotency keys               |

In the current static build, XP, streaks and drafts are stored only in
`localStorage`. The server-verified ledger and shared leaderboard activate when
accounts are switched on.

---

## 4. Architecture

```
content/tracks/<track>/lessons/*.mdx      lesson text + citations (hardcoded)
content/tracks/<track>/exercises/<slug>/ prompt.mdx · starter.py · tests.py
scripts/content/validate.ts              Zod validation, build gate
scripts/content/index.ts                 emits public/content-index.json
src/lib/content/read.ts                   filesystem reader (scripts + server)
src/lib/content/load.ts                   cached server-only reader (RSC)
src/lib/mdx/theme.ts                      monochrome Shiki theme
src/lib/pyodide/worker.ts                 browser runtime + test harness
src/components/python/*                   provider, console, editor, workbench
src/lib/gamification/*                    XP, levels, streaks, badges (pure)
src/db/schema.ts                          Drizzle schema (users, progress, XP)
```

Rendering: every lesson and exercise is prerendered at build time. Nothing in the
content path is dynamic. The exported site has no server routes; progress,
leaderboard and profile run client-side against `localStorage`.

Stack: Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind v4

- Static export via `output: "export"`, Pyodide 314.0.7, Shiki, MDX, Vitest,
  GitHub Actions, Vercel.
- Reserved for a future accounts release: Drizzle ORM, Neon Postgres, Auth.js v5.

---

## 5. Sources and licensing

Non-commercial, free forever. Every lesson cites the works it used.

| Source                                         | License                      |
| ---------------------------------------------- | ---------------------------- |
| Exercism Python Track                          | MIT                          |
| The Python Tutorial (PSF)                      | PSF License                  |
| Python for Everybody (site materials)          | CC BY                        |
| Python for Everybody (textbook)                | CC BY-NC-SA                  |
| Google's Python Class                          | CC BY 2.5 (code: Apache 2.0) |
| freeCodeCamp Curriculum                        | CC BY-SA 4.0                 |
| Think Python, 2nd Edition                      | CC BY-NC 3.0                 |
| Automate the Boring Stuff with Python          | CC BY-NC-SA 3.0              |
| CS50's Introduction to Programming with Python | CC BY-NC-SA 4.0              |
| SciPy Lecture Notes                            | CC BY 4.0                    |
| PyPA Packaging Tutorial                        | PSF-style permissive         |
| Pyodide                                        | MPL-2.0 (runtime)            |

Policy: keep copyright notices for permissive work; adapt CC work only under its exact
license with attribution; respect non-commercial terms in full; never monetise.

---

## 6. Delivery phases

| Phase | Scope                                                                     | Status          |
| ----- | ------------------------------------------------------------------------- | --------------- |
| 0     | Scaffold, quality gates, CI                                               | **Done**        |
| 1     | Monochrome design system, shell, landing                                  | **Done**        |
| 2     | MDX pipeline, Zod validation, Track 1 lessons                             | **Done**        |
| 3     | Pyodide worker, console, editor, tests                                    | **Done**        |
| 4     | Drizzle schema + migration, gamification, local progress                  | **Done**        |
| 5     | Server-side verification libs, rate limiting (route off in static export) | **Ready**       |
| 6     | Levels, streak, badges, XP chip, profile, activity grid                   | **Done**        |
| 7     | Ink-path curriculum map                                                   | **Done**        |
| 8     | Content: all eleven tracks have lessons                                   | **Done**        |
| 9     | Accessibility, SEO, sitemap, health check, error boundaries               | **Done**        |
| 10a   | Deploy static site to Vercel, connect GitHub auto-deploy                  | **In progress** |
| 10b   | Connect Neon, enable accounts, server-verified XP                         | **Planned**     |

Published today: **11 tracks, 92 lessons, 76 exercises, 28,345 words, 195 static pages.**

| Track                          | Lessons | Exercises |
| ------------------------------ | ------- | --------- |
| 1 Foundations                  | 10      | 18        |
| 2 Data Structures              | 9       | 15        |
| 3 Functions & Modules          | 9       | 16        |
| 4 Object-Oriented Python       | 9       | 10        |
| 5 Errors, Debugging & Testing  | 8       | 5         |
| 6 Files, Serialization & Regex | 8       | 4         |
| 7 Stdlib & Tooling             | 8       | 5         |
| 8 Concurrency & Async          | 7       | 1         |
| 9 Data with NumPy & Pandas     | 8       | 2         |
| 10 Web & APIs                  | 8       | 0         |
| 11 Capstone Projects           | 8       | 0         |

Exercises for tracks 6–9 came from the Exercism importer; tracks 10 and 11 have
no upstream equivalents, so their exercises are authored by hand next.

Maintenance commands used while writing content:

```bash
node scripts/content/renumber.mjs            # lesson and exercise ordering
node scripts/content/audit-entry-points.mjs   # imported exercise sanity
node scripts/import/promote-staged.mjs       # publish staged exercises
```

```bash
node scripts/content/renumber.mjs        # fix exercise ordering after any edit
node scripts/import/promote-staged.mjs   # publish staged exercises for tracks that have lessons
```

### Importing from upstream sources

`npm run content:import -- --track <slug> [--limit N] [--dry-run]` clones the
Exercism Python track into `.cache/`, converts practice exercises into
`prompt.mdx`, `starter.py` and `tests.py`, injects the MIT attribution and a
link to the exact upstream exercise, and continues numbering after the exercises
already in that track. `scripts/import/track-map.json` decides which upstream
exercises belong to which track.

An exercise is skipped, with a printed reason, when it needs pytest, when it
reads bundled data files such as `anagram.txt`, when it has no detectable entry
point, or when the same exercise already exists in another track. If the target
track has no lessons yet, output is staged under `content/staged/<track>/` so
the build stays green until the lessons are written.

### Deployment: static only

The site ships as static files. `next build` writes `out/`, and any static host
can serve it:

```bash
npm run build
npm start          # serves out/ locally on :3000
```

Copy `out/` to Vercel (zero configuration, framework detected), Netlify,
Cloudflare Pages, GitHub Pages, S3, or Nginx. `trailingSlash: true` is set so
every route resolves as a directory index on any host.

There is no backend, no database and no account system. What that changes:

- Progress, XP, levels, streaks, badges and exercise drafts live in
  `localStorage` and never leave the browser.
- Exercise verification runs in the browser's Pyodide worker. Server-side
  re-verification is disabled by default and can be re-enabled by removing
  `output: "export"` from `next.config.ts` and restoring a verification route
  (the runner is still in `src/lib/verify/node-runner.ts`).
- `/leaderboard` shows your own local standing; a global ranking would need
  accounts and a server.
- `/status` reports what is in the build: tracks, lessons, exercises, sources,
  and the fact that there is no backend.

The Drizzle schema and migration remain in the repository, ready for the day
accounts are switched on.

---

## 7. Definition of done

A release ships when: every published lesson renders statically; every exercise has a
passing test suite verified in the browser (and on the server once that route is
restored); `npm run check` and `npm run build` are green; keyboard navigation and
reduced motion work; the credits page lists every source used; and a first-time visitor
can go from the landing page to running Python in under two clicks.
