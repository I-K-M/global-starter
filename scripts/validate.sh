#!/usr/bin/env bash
set -euo pipefail

pnpm lint
pnpm typecheck
pnpm test
pnpm build

echo "Validation complete. Run pnpm test:e2e when browser-facing behavior changed."
