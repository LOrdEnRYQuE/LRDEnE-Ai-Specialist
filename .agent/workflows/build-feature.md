# /build-feature — WebApp Architect Workflow

Trigger: `/build-feature` or "build a feature", "implement X", "add X to the app"

---

## Activation

🤖 **Applying knowledge of `@[webapp-architect]`...**

---

## Phase 1: Understand

Before writing code, answer:
1. What is the exact goal of this feature?
2. What is the current state of the codebase?
3. What are the constraints? (stack, backwards compat, deadline)

> **If any of the above is unclear, ask the user before proceeding.**

---

## Phase 2: Scan

```
Tool: repo_scan(repoPath)
```

Review the output carefully:
- Which frameworks / package managers are in use?
- Are there existing routes or API endpoints related to this feature?
- What database / deployment setup exists?

---

## Phase 3: Plan

Produce `implementation-plan.md`:

```markdown
# Implementation Plan: [Feature Name]

## Goal
...

## Approach
...

## Files to Change
| File | Action | Reason |
|------|--------|--------|

## Assumptions
- [ASSUMPTION] ...

## Verification Steps
1. ...
```

> **Stop here. Present the plan to the user. Wait for approval before continuing.**

---

## Phase 4: Scaffold

```
Tool: scaffold_feature(featureName, path)
```

Create the file/folder structure. Do not fill in logic yet — get the shape right first.

---

## Phase 5: Implement

Work file by file. For each file:
- Write the minimum code to make the feature work
- Add types (if TypeScript is in use)
- Comment non-obvious decisions

---

## Phase 6: Test

- Run existing tests: `npm test` / `pnpm test`
- If no tests exist, add at least one unit test for the core logic
- Verify the feature manually with a short walkthrough

---

## Phase 7: Document

Update:
- README if the feature changes public-facing behaviour
- API docs / comments if new endpoints are added
- CHANGELOG.md with the feature entry

---

## Completion Checklist

```markdown
## Summary
- **Goal**: [what was built]
- **Files changed**: [list]
- **Tests run**: [yes/no — which ones]
- **Known limitations**: [any]
- **How to verify**: [manual steps]
```
