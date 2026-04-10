# Antigravity Workflow: Build Feature

1. Classify the request. Is this a greenfield build, feature addition, or refactor?
2. Activate the `WebApp Architect` skill.
3. Run `repo_scan` to understand the current codebase.
4. Draft an `implementation-plan.md` and present it for user approval.
5. Create a dedicated feature branch: `feature/<slug>`.
6. Use `scaffold_feature` to create initial file structure.
7. Implement in small, focused steps — one logical unit at a time.
8. Run or propose tests after each unit.
9. On completion, produce: changed-files-summary, test results, and PR description.
