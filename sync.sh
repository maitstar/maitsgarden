#!/bin/bash
# sync.sh — Obsidian Zettels → GitHub → Vercel auto-deploys

VAULT="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Second Brain/03- Zettels"
QUARTZ_DIR="$(cd "$(dirname "$0")" && pwd)"
CONTENT="$QUARTZ_DIR/content"
LOG="$QUARTZ_DIR/.sync.log"

echo "[$(date '+%H:%M:%S')] Syncing..." | tee -a "$LOG"

# 1. Pull Obsidian Zettels into content/
rsync -a --delete \
  --exclude='.obsidian' \
  --exclude='.DS_Store' \
  --exclude='*.canvas' \
  "$VAULT/" "$CONTENT/" \
  --filter='protect index.md' 2>>"$LOG"

# 2. Check if anything changed
cd "$QUARTZ_DIR"
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard content/)" ]; then
  echo "[$(date '+%H:%M:%S')] No changes, skipping push." | tee -a "$LOG"
  exit 0
fi

# 3. Commit & push
git add content/
git commit -m "sync: $(date '+%Y-%m-%d %H:%M')" --quiet
git push origin HEAD --quiet 2>>"$LOG"

echo "[$(date '+%H:%M:%S')] ✅ Pushed → Vercel rebuilding..." | tee -a "$LOG"
