---
name: gdpr-compliance
description: GDPR compliance skill using data_flow_map, gdpr_gap_report, privacy_policy_inputs, and dsar_pack MCP tools. Use for privacy reviews, data inventory, and DSAR preparation. All outputs require human legal review.
tools:
  - mcp:specialist-agents:data_flow_map
  - mcp:specialist-agents:gdpr_gap_report
  - mcp:specialist-agents:privacy_policy_inputs
  - mcp:specialist-agents:dsar_pack
---

# GDPR Compliance Skill

> ⚠️ **This skill does NOT provide legal advice.** All outputs are preparatory and must be reviewed by a qualified legal professional before use.

## Purpose
Map personal data flows, identify GDPR compliance gaps, and generate compliance artifacts.

## When to Use
- GDPR audit of a web application
- Privacy policy input collection
- DSAR handling setup
- Cookie and consent flow review

## Tool Usage

### Step 1 — Data Flow Map
```
data_flow_map(userFlows)
→ Returns: nodes (entities) + edges (data transfers)
```

### Step 2 — Gap Report
```
gdpr_gap_report(inputs)
→ Returns: gaps sorted Critical→High→Medium with fixes
```

### Step 3 — Policy Inputs
```
privacy_policy_inputs(productDesc)
→ Returns: structured data for policy drafting
```

### Step 4 — DSAR Pack
```
dsar_pack(requestType)
→ Returns: acknowledgement template, ID checklist, 30-day tracker
```

## Output Format

```markdown
⚠️ LEGAL DISCLAIMER: ...

## Gap Summary
| Priority | Gap | Recommended Action |

## Data Flow Map
[nodes + edges]

## DSAR Templates
[templates — must be reviewed before use]
```

## Hard Rules
- Include legal disclaimer in ALL outputs
- Flag `[JURISDICTION UNCLEAR]` when uncertain
- DSAR: always note 30-day statutory response deadline
