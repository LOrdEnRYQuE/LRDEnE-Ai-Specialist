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

# ── 3. Install MCP server dependencies directly (no workspace loop) ───
echo -e "${YELLOW}⬇ Installing MCP server dependencies...${NC}"
cd "$(dirname "$0")/mcp-server"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# ── 4. Build MCP server ───────────────────────────────────────────────
echo -e "${YELLOW}🔨 Building MCP server...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete → mcp-server/dist/index.js${NC}"
cd ..
echo ""

# ── 5. Configure .agent/mcp_config.json ────────────────────────────────
echo -e "${YELLOW}⚙️ Configuring .agent/mcp_config.json...${NC}"
ABS_PATH="$(pwd)/mcp-server/dist/index.js"
CONFIG_FILE=".agent/mcp_config.json"

if [ -f "$CONFIG_FILE" ]; then
  # Detect OS for sed compatibility
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s|\"args\": \[\".*\"\]|\"args\": \[\"$ABS_PATH\"\]|g" "$CONFIG_FILE"
  else
    sed -i "s|\"args\": \[\".*\"\]|\"args\": \[\"$ABS_PATH\"\]|g" "$CONFIG_FILE"
  fi
  echo -e "${GREEN}✓ .agent/mcp_config.json updated with local path.${NC}"
else
  echo -e "${YELLOW}⚠ .agent/mcp_config.json not found. Skipping auto-config.${NC}"
fi
echo ""

# ── 6. Print next steps ──────────────────────────────────────────────
echo "────────────────────────────────────────────"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "The specialist agents are now active via the .agent/ folder."
echo "Register the global MCP server in your IDE if you want to use it elsewhere:"
echo ""
echo "  CURSOR (Settings → MCP → Add Server):"
echo "    Name:    specialist-agents"
echo "    Type:    command"
echo "    Command: node"
echo "    Args:    $ABS_PATH"
echo ""
echo "  WINDSURF / ANTIGRAVITY (Current Workspace):"
echo "    The .agent/mcp_config.json has been automatically updated."
echo "    Simply restart your agent or workspace to refresh."
echo ""
echo "  See docs/ for full platform-specific guides."
echo "────────────────────────────────────────────"
