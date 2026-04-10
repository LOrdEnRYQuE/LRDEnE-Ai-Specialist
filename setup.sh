#!/usr/bin/env bash
# setup.sh — One-command setup for the LRDEnE Specialist Agents Kit
set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 LRDEnE Specialist Agents Kit — Setup${NC}"
echo "────────────────────────────────────────────"

# ── 1. Check Node.js ──────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo -e "${RED}✗ Node.js not found.${NC}"
  echo "  Install via: https://nodejs.org or 'brew install node'"
  exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js found:${NC} $NODE_VERSION"

# ── 2. Check npm ──────────────────────────────────────────────────────
if ! command -v npm &>/dev/null; then
  echo -e "${RED}✗ npm not found.${NC}"
  exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ npm found:${NC} $NPM_VERSION"
echo ""

# ── 3. Install MCP server dependencies ───────────────────────────────
echo -e "${YELLOW}⬇ Installing MCP server dependencies...${NC}"
cd mcp-server
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# ── 4. Build MCP server ───────────────────────────────────────────────
echo -e "${YELLOW}🔨 Building MCP server...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete → mcp-server/dist/index.js${NC}"
cd ..
echo ""

# ── 5. Print next steps ───────────────────────────────────────────────
ABS_PATH=$(pwd)/mcp-server/dist/index.js

echo "────────────────────────────────────────────"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "  CURSOR:"
echo "    Settings → MCP → Add Server"
echo "    Command: node $ABS_PATH"
echo ""
echo "  WINDSURF:"
echo "    Add to mcp_config.json:"
echo "    { \"command\": \"node\", \"args\": [\"$ABS_PATH\"] }"
echo ""
echo "  ANTIGRAVITY:"
echo "    Register MCP → Command: node $ABS_PATH"
echo ""
echo "  See docs/ for full install guides."
echo "────────────────────────────────────────────"
