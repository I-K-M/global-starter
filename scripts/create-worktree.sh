#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <ticket-slug>" >&2
  exit 64
fi

slug="$1"
if [[ ! "$slug" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "Ticket slug must use lowercase letters, digits, and single hyphens." >&2
  exit 64
fi

repo_root="$(git rev-parse --show-toplevel)"
repo_name="$(basename "$repo_root")"
branch="agent/$slug"
target="$(dirname "$repo_root")/${repo_name}-${slug}"

git -C "$repo_root" worktree add -b "$branch" "$target"
printf 'Created %s on %s\n' "$target" "$branch"
