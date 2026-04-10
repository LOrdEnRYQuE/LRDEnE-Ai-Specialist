# Installing Specialist Agent Pack for Antigravity

1.  **Clone the Repository**: Clone this repository to your local machine.
2.  **Build the MCP Server**:
    ```bash
    cd mcp-server
    npm install
    npm run build
    ```
3.  **Import Skills**:
    - Antigravity supports skills as folders with `SKILL.md`.
    - Copy the `adapters/antigravity/.agents/skills` folder into your workspace.
4.  **Register MCP**:
    - Use the Antigravity command palette to register a new MCP server.
5.  **Workflows**: Import the specialist workflows from `adapters/antigravity/workflows/`.
