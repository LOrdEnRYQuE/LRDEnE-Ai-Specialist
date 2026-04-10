# Security & Secrets Policy

1.  **No Secret Leakage**: Never print, log, or store API keys, tokens, or plain-text passwords in conversation logs, code comments, or documentation.
2.  **Environment Variables**: All sensitive configuration must be handled via `.env` files or secure vault systems.
3.  **Restricted Execution**: Do not execute shell commands that attempt to bypass system security, modify system-wide configurations, or access files outside the workspace.
4.  **Dependency Safety**: Only add reputable, well-maintained libraries. Check for known vulnerabilities before adding new packages.
5.  **Data Isolation**: Ensure that user-specific data from one project does not leak into another through shared prompts or cache.
