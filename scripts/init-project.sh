#!/usr/bin/env bash

set -euo pipefail

usage() {
  echo "Usage: $0 /absolute/path/to/wordpress-root" >&2
}

if [[ $# -ne 1 ]]; then
  usage
  exit 64
fi

requested_target="$1"

if [[ "$requested_target" != /* ]]; then
  echo "WordPress root must be an absolute path: $requested_target" >&2
  usage
  exit 64
fi

if [[ ! -d "$requested_target" ]]; then
  echo "Target directory does not exist: $requested_target" >&2
  exit 66
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
starter_dir="$(cd "$script_dir/../assets/project-starter" && pwd -P)"
target_dir="$(cd "$requested_target" && pwd -P)"

if [[ "$target_dir" == "/" ]]; then
  echo "Refusing to initialize the filesystem root." >&2
  exit 73
fi

missing_wordpress_paths=()
if [[ ! -f "$target_dir/wp-load.php" ]]; then
  missing_wordpress_paths+=("wp-load.php")
fi
for required_dir in wp-admin wp-content wp-includes; do
  if [[ ! -d "$target_dir/$required_dir" ]]; then
    missing_wordpress_paths+=("$required_dir/")
  fi
done

if (( ${#missing_wordpress_paths[@]} > 0 )); then
  echo "Target is not a standard WordPress root; missing:" >&2
  printf '  - %s\n' "${missing_wordpress_paths[@]}" >&2
  echo "Pass the directory that contains wp-load.php, wp-admin/, wp-content/ and wp-includes/." >&2
  echo "For a nonstandard layout, merge the starter manually after reviewing project paths." >&2
  exit 65
fi

conflicts=()
for relative_path in AGENTS.md AI-START-HERE.md mcp-config.example.json docs; do
  if [[ -e "$target_dir/$relative_path" ]]; then
    conflicts+=("$relative_path")
  fi
done

if (( ${#conflicts[@]} > 0 )); then
  echo "Starter was not copied because these targets already exist:" >&2
  printf '  - %s\n' "${conflicts[@]}" >&2
  echo "Review or move them manually; this script never overwrites project records." >&2
  exit 73
fi

(
  cd "$starter_dir"
  tar --exclude='.DS_Store' --exclude='._*' --exclude='__MACOSX' -cf - .
) | (
  cd "$target_dir"
  tar -xf -
)

echo "Tổng Lực project starter initialized at: $target_dir"
echo "Next: open docs/STATUS.md, complete its Current inputs, then follow Next action."
