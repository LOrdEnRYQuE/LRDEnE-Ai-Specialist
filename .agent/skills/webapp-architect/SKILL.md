---
name: webapp-architect
description: Full-stack web application planning and building skill using repo_scan, architecture_plan, and scaffold_feature MCP tools. Use for new features, architecture reviews, and production-ready scaffolding.
tools:
  - mcp:specialist-agents:repo_scan
  - mcp:specialist-agents:architecture_plan
  - mcp:specialist-agents:scaffold_feature
---

# WebApp Architect Skill

## Purpose
Systematically plan and scaffold web application features using live codebase data.

## When to Use
- Greenfield build or feature addition
- Architecture review before major changes
- Scaffolding file structure for a new module

## Tool Usage

### Step 1 — Repo Scan
```
repo_scan(repoPath)
→ Returns: frameworks, package managers, routes, API endpoints, DB, deploy indicators
```

### Step 2 — Architecture Plan
```
architecture_plan(goal, context)
→ context = output of repo_scan.data
→ Returns: components, data flow, risks
```

### Step 3 — Scaffold
```
scaffold_feature(featureName, path)
→ Returns: list of generated boilerplate files (page.tsx, layout.tsx, etc.)
```

## Output Format

Every implementation task must produce:

```markdown
## Implementation Plan
- **Goal**: ...
- **Approach**: ...
- **Files to change**: ...
- **Assumptions**: ...
- **Verification**: ...
```

## Hard Rules
- Run `repo_scan` before proposing any structural change
- Never invent routes/env vars without marking `[ASSUMPTION]`
- Produce implementation plan before multi-file changes
- Do not claim tests passed unless they ran
