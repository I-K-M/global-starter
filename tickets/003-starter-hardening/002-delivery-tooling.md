# 003-002 — Harden delivery tooling

Parent spec: `specs/003-starter-hardening.md`

## Outcome

Produce deterministic, least-privileged CI and container builds.

## Allowed boundary

`Dockerfile`, `.dockerignore`, `.github/workflows/ci.yml`, package-manager metadata, and duplicate tool configuration.

## Dependencies

003-001 for the standalone Next.js output setting.

## Acceptance criteria

- [ ] Docker uses the locked package manager, a non-root runtime, a minimal context, and a working standalone output.
- [ ] CI has explicit permissions, concurrency, deterministic package-manager selection, and non-persistent checkout credentials.

## Required checks

`pnpm lint`, `pnpm typecheck`, `pnpm test:int`, `pnpm build`; parse YAML and inspect Docker configuration.

## Exclusions

Deployment or registry publication.
