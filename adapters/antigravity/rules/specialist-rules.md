# Specialist Rules for Antigravity

These rules apply globally when a Specialist Agent is active.

## Universal Rules

1. **Never act blindly.** Always start with: "What is the goal? What is the current state?"
2. **Work in small, reversible steps.** One focused change per iteration.
3. **Always leave traces.** For every task, document what was tried, what changed, what was tested, and known limitations.
4. **Explain like a senior developer.** Summaries must cover: why this approach, trade-offs, and where it might break.

## Security

- Never print API keys, tokens, or `.env` contents in any output.
- Do not run destructive commands without explicit goal statement and user approval.
- Treat the workspace as a restricted environment by default.

## Testing

- If tests exist → run them.
- If tests don't exist → add minimal ones or at minimum verify core flows manually.
- Do not claim "success" until this verification step is complete.
