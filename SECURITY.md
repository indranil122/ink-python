# Security policy

## Supported versions

Security fixes are applied to the latest code on the `main` branch and the most
recent release. Older releases may not receive patches.

## Reporting a vulnerability

Please do not open a public issue for a security vulnerability.

1. Use GitHub's private vulnerability reporting: open the repository's
   **Security** tab, select **Report a vulnerability**, and describe the issue.
2. If private reporting is unavailable, email
   <indranilchatterjee098@gmail.com> with the subject
   `ink-python security report`.

Include, where possible:

- The affected route, file or workflow.
- Steps to reproduce.
- The impact and any suggested fix.
- Whether the issue is already public or under disclosure.

You should receive an acknowledgement within **7 days** and a status update
within **30 days**. Please allow time for a fix before public disclosure.

## Scope

In scope:

- The deployed Ink site and its source code.
- The content validation and build pipeline.
- The Pyodide worker and exercise test harness.
- Dependency or configuration issues that affect this project.

Out of scope:

- The third-party Pyodide CDN or browser itself.
- Issues that require compromising the learner's own device or browser profile.
- Social engineering, spam and denial-of-service volume testing against
  production without prior agreement.

## Preferred languages

English.

## Disclosure

We follow coordinated disclosure: report privately, agree a reasonable fix
window, then publish details once users are protected.
