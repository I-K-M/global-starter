# Proof pack — Starter hardening

## Summary

Hardened the starter's privileged HTTP boundaries, environment validation, media uploads, response headers, container build, CI permissions, and unit-test coverage.

## Scope

- Spec: `specs/003-starter-hardening.md`
- Tickets: `tickets/003-starter-hardening/001-application-boundaries.md`, `tickets/003-starter-hardening/002-delivery-tooling.md`

## Changed behavior

- Seed requests now require an administrator and an exact same-origin request.
- Preview requests use constant-time secret comparison and reject protocol-relative redirects.
- Production secrets require at least 32 characters; non-local production URLs require HTTPS.
- Empty optional integration variables are normalized to absent values.
- Media accepts images only; upload parsing aborts above 10 MB or more than one file.
- Payload CORS and CSRF origins are explicit.
- Next.js emits a standalone build with baseline security headers and no framework banner.
- Docker uses the locked pnpm version, a reduced build context, a non-root runtime, and a health check.
- CI has read-only repository permissions, cancellation for superseded runs, non-persistent checkout credentials, and explicit lifecycle-script handling.
- Unit tests are now included in local validation and CI.

## Checks and results

- `git diff a99b9d6..HEAD --check`: passed.
- `package.json` JSON parse: passed.
- `.github/workflows/ci.yml` YAML parse: passed.
- `bash -n scripts/*.sh`: passed.
- `pnpm install --offline --frozen-lockfile`: lockfile and supply-chain policy verification passed; dependency materialization stopped because the offline store lacks `@payloadcms/admin-bar@3.87.1`.
- Full lint, typecheck, tests, build, and Docker build could not run in this workspace because external package download and Docker are unavailable. GitHub CI remains the required executable gate.

## Cold-review findings resolved

- Blocked protocol-relative preview paths that could redirect away from the site.
- Added same-origin verification to the custom seed route, which is outside Payload's built-in CSRF route handling.
- Allowed HTTP only for loopback hosts so production validation remains compatible with local container and CI builds.
- Excluded `test.env` from the Docker context.
- Connected existing and new unit tests to `pnpm check` and CI.
- Updated the CI preview-secret fixture to satisfy the enforced 32-character minimum.
- Removed shadow collection configs that caused generated Payload types to omit production fields.
- Made seed/test roles explicit and preserved literal global slugs for generated-type safety.

## Migrations and environment changes

- No database migration.
- `PREVIEW_SECRET` must be at least 32 characters.
- If set, `CRON_SECRET` must be at least 32 characters.
- Non-local `NEXT_PUBLIC_SERVER_URL` must use HTTPS in production.

## Risks and limitations

- The 10 MB upload limit is global to Payload uploads; raise it intentionally if future collections need larger files.
- MIME allowlisting relies on Payload's upload validation and should be paired with CDN response hardening in the chosen hosting platform.
- Dependency vulnerability results require the connected CI/network environment.

## Rollback

Revert the individual commit matching the affected boundary. No data rollback is required.

## Human checks still required

- Confirm CI passes on Node 22.
- Build the Docker image with production-equivalent build environment variables.
- Verify admin login, seed, image upload, live preview, and scheduled jobs in a preview deployment.
