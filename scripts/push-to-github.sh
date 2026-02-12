#!/bin/bash
set -e

REPO="Qahtani1979/Dakkah-cityos-chat-app"
BRANCH="main"
WORK_DIR="/tmp/dakkah-push-$$"

echo "============================================"
echo "  Dakkah CityOS - Push to GitHub"
echo "============================================"
echo ""

HOSTNAME=$REPLIT_CONNECTORS_HOSTNAME
TOKEN=""
if [ -n "$REPL_IDENTITY" ]; then
  TOKEN="repl $REPL_IDENTITY"
elif [ -n "$WEB_REPL_RENEWAL" ]; then
  TOKEN="depl $WEB_REPL_RENEWAL"
fi

echo "[1/5] Getting GitHub access token..."
ACCESS_TOKEN=$(curl -s -H "Accept: application/json" -H "X_REPLIT_TOKEN: $TOKEN" \
  "https://$HOSTNAME/api/v2/connection?include_secrets=true&connector_names=github" \
  | python3 -c "
import sys,json
d=json.load(sys.stdin)
item=d.get('items',[])[0] if d.get('items') else {}
s=item.get('settings',{})
t=s.get('access_token','') or s.get('oauth',{}).get('credentials',{}).get('access_token','')
print(t)
")

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "None" ]; then
  echo "  ERROR: Could not get GitHub token."
  exit 1
fi
echo "  Done."

AUTH_URL="https://x-access-token:${ACCESS_TOKEN}@github.com/${REPO}.git"

echo "[2/5] Copying project files..."
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR"
cd /home/runner/workspace
tar --exclude='node_modules' --exclude='.git' --exclude='.cache' --exclude='.config' --exclude='attached_assets' --exclude='.github' -cf - . | (cd "$WORK_DIR" && tar xf -)
echo "  Copied $(find "$WORK_DIR" -type f | wc -l) files."

echo "[3/5] Initializing clean repo..."
cd "$WORK_DIR"
git init -b main
git config user.email "dakkah@cityos.dev"
git config user.name "Dakkah CityOS"

echo "[4/5] Committing all files..."
git add -A
git commit -m "Dakkah CityOS - Full project with API gateway service layer" \
  -m "- React 18 + Vite 6 + Tailwind CSS v4 frontend
- Copilot-style conversational interface
- Multi-vertical support (logistics, commerce, fintech, health)
- Complete API gateway service layer (12 service modules)
- GitHub Actions CI/CD pipeline
- Connected to: Payload CMS, Medusa, Fleetbase, ERPNext, Walt.id, Temporal, Stripe"

echo "[5/5] Pushing to GitHub..."
git push --force "$AUTH_URL" main

cd /home/runner/workspace
rm -rf "$WORK_DIR"

echo ""
echo "============================================"
echo "  SUCCESS!"
echo "  https://github.com/${REPO}"
echo "============================================"
