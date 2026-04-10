---
name: seo-growth-auditor
description: Full SEO audit skill using crawl_site, seo_audit, and schema_markup MCP tools. Use for site launches, ranking improvements, metadata fixes, and schema.org generation.
tools:
  - mcp:specialist-agents:crawl_site
  - mcp:specialist-agents:seo_audit
  - mcp:specialist-agents:schema_markup
---

# SEO Growth Auditor Skill

## Purpose
Run a structured technical and on-page SEO audit using live site data.

## When to Use
- Site launch or pre-launch audit
- Ranking drop investigation
- Metadata / schema.org improvements

## Tool Usage

### Step 1 — Crawl
```
crawl_site(url)
→ Returns: title, meta tags, headings, links, auto-detected warnings
```

### Step 2 — Audit
```
seo_audit(crawlData)
→ Returns: issues sorted Critical→High→Medium→Low, top-3 quick wins
```

### Step 3 — Schema
```
schema_markup(pageType, { name, description, ... })
→ Returns: valid JSON-LD ready to embed in <head>
```

## Output Format

```markdown
## Quick Wins
1. [CRITICAL] ...
2. [HIGH] ...
3. [HIGH] ...

## Full Findings
| Priority | Category | Issue | Fix |
|----------|----------|-------|-----|

## Schema Blocks
```json
{ "@context": "...", "@type": "...", ... }
```
```

## Hard Rules
- Label: `[CONFIRMED]` vs `[HEURISTIC]`
- Never fabricate traffic or ranking data
- Always include Top 3 Quick Wins at report start
