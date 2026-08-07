#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--" ]]; then
  shift
fi

slug="${1:-$(date +%Y%m%d-%H%M%S)}"
if [[ ! "$slug" =~ ^[a-zA-Z0-9._-]+$ ]]; then
  echo "Proof name contains unsupported characters." >&2
  exit 64
fi

output="proofs/${slug}.md"
mkdir -p proofs
branch="$(git branch --show-current 2>/dev/null || echo unavailable)"
summary="$(git diff --stat 2>/dev/null || true)"

{
  echo "# Proof pack — $slug"
  echo
  echo "## Context"
  echo
  echo "- Branch: \`$branch\`"
  echo "- Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo
  echo "## Change summary"
  echo
  echo '```text'
  printf '%s\n' "${summary:-No uncommitted diff summary available.}"
  echo '```'
  echo
  echo "## Acceptance evidence"
  echo
  echo "- [ ] Spec and tickets linked"
  echo "- [ ] Lint, typecheck, tests, and build recorded"
  echo "- [ ] Mobile and desktop screenshots attached when visual"
  echo "- [ ] Browser console checked"
  echo "- [ ] Review findings resolved or declined with reasons"
  echo
  echo "## Deployment"
  echo
  echo "- Environment changes: none recorded"
  echo "- Migration: none recorded"
  echo "- Rollback: revert the delivery commit"
  echo "- Human approval: required before production"
} > "$output"

printf 'Created %s\n' "$output"
