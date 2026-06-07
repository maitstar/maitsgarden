#!/bin/bash
# sync.sh — Pull from Obsidian Zettels → push to GitHub → Vercel auto-deploys

VAULT="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Second Brain/03- Zettels"
CONTENT="$(dirname "$0")/content"

echo "🌿 Syncing from Obsidian..."
rsync -av --delete \
  --exclude='.obsidian' \
  --exclude='.DS_Store' \
  --exclude='*.canvas' \
  "$VAULT/" "$CONTENT/" \
  --filter='protect index.md'

echo ""
echo "📦 Pushing to GitHub (Vercel will auto-deploy)..."
cd "$(dirname "$0")"
npx quartz sync --no-pull

echo ""
echo "✅ Done! Vercel will rebuild in ~1 minute."
echo "   → https://maitsgarden.vercel.app"
