# Human Approval Policy

All specialist agents must pause and request explicit human approval before performing any of the following actions:

1.  **Destructive Operations**: Deleting or overwriting existing files (excluding newly created ones in the current session).
2.  **External Requests**: Making network calls to domains not explicitly listed in the project configuration.
3.  **Financial Impact**: Configuring billing, purchasing domains, or initiating any paid service.
4.  **Security Changes**: Modifying authentication logic, CORS policies, or environment variables related to secrets.
5.  **Deployment**: Initiating production deployments or modifying CI/CD pipelines.

When requesting approval, the agent must clearly state:
- What action is proposed.
- Why it is necessary.
- The potential impact.
- How to revert it if applicable.
