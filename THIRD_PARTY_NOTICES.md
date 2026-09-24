# Third-party notices

This project combines original work with openly licensed software, fonts and
educational material. Original software is MIT-licensed; original course
content is CC BY-NC-SA 4.0. Third-party material keeps its own licence and is
never re-licensed by this repository.

## Runtime and build dependencies

Direct dependencies declared in `package.json`:

| Package                       | Licence    |
| ----------------------------- | ---------- |
| `@neondatabase/serverless`    | MIT        |
| `drizzle-orm`                 | Apache-2.0 |
| `github-slugger`              | ISC        |
| `gray-matter`                 | MIT        |
| `next`                        | MIT        |
| `next-mdx-remote`             | MPL-2.0    |
| `pyodide`                     | MPL-2.0    |
| `react`                       | MIT        |
| `react-dom`                   | MIT        |
| `rehype-autolink-headings`    | MIT        |
| `rehype-slug`                 | MIT        |
| `remark-gfm`                  | MIT        |
| `server-only`                 | MIT        |
| `shiki`                       | MIT        |
| `zod`                         | MIT        |
| `@tailwindcss/postcss`        | MIT        |
| `@types/node`                 | MIT        |
| `@types/react`                | MIT        |
| `@types/react-dom`            | MIT        |
| `drizzle-kit`                 | MIT        |
| `eslint`                      | MIT        |
| `eslint-config-next`          | MIT        |
| `prettier`                    | MIT        |
| `prettier-plugin-tailwindcss` | MIT        |
| `tailwindcss`                 | MIT        |
| `tsx`                         | MIT        |
| `typescript`                  | Apache-2.0 |
| `vitest`                      | MIT        |

Pyodide is used as an in-browser runtime fetched from a pinned CDN. It is not
redistributed in this repository. MPL-2.0 obligations apply to Pyodide's own
source, available from <https://github.com/pyodide/pyodide>.

## Fonts

Newsreader and JetBrains Mono are loaded at build time with `next/font/google`
and self-hosted in the generated site.

| Font           | Designer / foundry | Licence                   |
| -------------- | ------------------ | ------------------------- |
| Newsreader     | Production Type    | SIL Open Font License 1.1 |
| JetBrains Mono | JetBrains          | SIL Open Font License 1.1 |

## Educational sources

The course is assembled from openly licensed teaching material. Every lesson
and exercise names the work it drew from, and adaptations are published under
the terms of the original licence.

| Source                                         | Licence                      |
| ---------------------------------------------- | ---------------------------- |
| Exercism Python Track                          | MIT                          |
| The Python Tutorial (PSF)                      | PSF Licence                  |
| Python for Everybody (site materials)          | CC BY 4.0                    |
| Python for Everybody (textbook)                | CC BY-NC-SA                  |
| Google's Python Class                          | CC BY 2.5 (code: Apache 2.0) |
| freeCodeCamp Curriculum                        | CC BY-SA 4.0                 |
| Think Python, 2nd Edition                      | CC BY-NC 3.0                 |
| Automate the Boring Stuff with Python          | CC BY-NC-SA 3.0              |
| CS50's Introduction to Programming with Python | CC BY-NC-SA 4.0              |
| SciPy Lecture Notes                            | CC BY 4.0                    |
| PyPA Packaging Tutorial                        | PSF-style permissive         |
| Pyodide                                        | MPL-2.0 (runtime)            |

The authoritative, lesson-by-lesson source list is rendered on the deployed
site at `/credits` and is generated from `src/lib/sources.ts`.

## Policy

- Keep copyright notices for permissive work.
- Adapt Creative Commons work only under its exact licence, with attribution.
- Respect non-commercial terms in full.
- Never monetise adapted non-commercial material.
