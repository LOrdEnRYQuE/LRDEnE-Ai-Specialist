# Installing Specialist Agent Pack for Windsurf

1.  **Clone the Repository**: Clone this repository to your local machine.
2.  **Build the MCP Server**:
    ```bash
    cd mcp-server
    npm install
    npm run build
    ```
3.  **Active Agents**:
    - Windsurf automatically detects skills in the `.agents/skills` directory of your workspace.
    - Path the `adapters/windsurf/.agents` folder into your target project.
4.  **Configure MCP**:
    - Add the MCP server command to your Windsurf `mcp_config.json`.
5.  **Usage**: Type `/` in the Cascade chat to see available workflows.
