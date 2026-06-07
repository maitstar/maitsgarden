#!/bin/bash
# watch.sh — watches Obsidian Zettels, auto-syncs on any .md change

VAULT="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Second Brain/03- Zettels"
QUARTZ_DIR="$(cd "$(dirname "$0")" && pwd)"
SYNC="$QUARTZ_DIR/sync.sh"
LAST_SYNC=0
DEBOUNCE=8  # seconds to wait after last change before syncing

echo "[$(date '+%H:%M:%S')] Garden watcher started. Watching Obsidian Zettels..."

/opt/homebrew/bin/fswatch -r -e '\.DS_Store' -e '\.obsidian' -i '\.md$' "$VAULT" | while read -r event; do
  NOW=$(date +%s)
  # debounce: only sync if DEBOUNCE seconds have passed since last sync
  if [ $((NOW - LAST_SYNC)) -ge $DEBOUNCE ]; then
    LAST_SYNC=$NOW
    bash "$SYNC"
  fi
done
