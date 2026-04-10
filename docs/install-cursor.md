# Installing Specialist Agent Pack for Cursor

1.  **Clone the Repository**: Clone this repository to your local machine.
2.  **Build the MCP Server**:
    ```bash
    cd mcp-server
    npm install
    npm run build
    ```
3.  **Configure Cursor**:
    - Open Cursor Settings > MCP.
    - Click **+ Add New MCP Server**.
    - Set Name to `specialist-agents`.
    - Set Type to `command`.
    - Set Command to `node [absolute-path-to-repo]/mcp-server/dist/index.js`.
4.  **Import Rules**:
    - Place the `.mdc` files from `adapters/cursor/rules/` into your project's `.cursor/rules/` directory (or configure them globally).
5.  **Verify**: Open the Cursor Composer and ask: "Who are the available specialists?"
