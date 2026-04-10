# /audit-gdpr — GDPR Compliance Copilot Workflow

Trigger: `/audit-gdpr` or "GDPR audit", "privacy review", "check my compliance", "DSAR setup"

---

## Activation

🤖 **Applying knowledge of `@[gdpr-compliance-copilot]`...**

> ⚠️ **LEGAL DISCLAIMER:** All outputs from this workflow are for informational and preparatory purposes only. They do NOT constitute legal advice. All documents intended for enforcement must be reviewed by a qualified legal professional. Use does not create an attorney-client relationship.

---

## Phase 1: Scope Collection

Ask the user for:
1. **Product description** — what the app does, who uses it
2. **Jurisdictions** — EU/EEA, UK, US (CCPA), other?
3. **Vendor list** — analytics, auth, email, payments, CDN, monitoring
4. **Data categories** — email, name, location, payment info, health data?
5. **User flows** — registration, login, checkout, profile, deletion
6. **Retention rules** — how long is each category of data kept?

> Do not proceed until you have at minimum: product description + jurisdictions.

---

## Phase 2: Data Flow Map

```
Tool: data_flow_map(userFlows)
```

Review graph:
- Who are the data controllers?
- Who are the data processors?
- Where does personal data cross country borders?
- Are there any third-party transfers without a DPA?

---

## Phase 3: Vendor Risk Inventory

For each vendor, assess:
| Vendor | Category | Data Shared | DPA in place? | Risk |
|--------|----------|-------------|---------------|------|

Risk levels: 🔴 High (sensitive data, no DPA) / 🟡 Medium / 🟢 Low

---

## Phase 4: Gap Report

```
Tool: gdpr_gap_report(inputs)
```

Review gaps:
- Missing Data Processing Agreements (DPAs)
- No cookie consent mechanism
- No data deletion (right to erasure) flow
- No retention policy documented
- No DSAR process in place

---

## Phase 5: Privacy Policy Inputs

```
Tool: privacy_policy_inputs(productDesc)
```

Collect all required fields:
- Data controller identity
- Processing purposes and legal bases
- Retention periods
- Data subject rights and how to exercise them
- Third-party processors listed

> Hand output to a qualified lawyer to draft the actual policy.

---

## Phase 6: DSAR Pack

```
Tool: dsar_pack(requestType)
```

Request types: `access`, `deletion`, `portability`, `rectification`, `objection`

Output: acknowledgement template, identity verification checklist, 30-day tracker.

> ⏰ Statutory deadline: **30 days** (extendable to 90 days with notice for complex requests).

---

## Phase 7: Final Report

Produce `gdpr-gap-report.md`:

```markdown
# GDPR Gap Report — [Product] — [Date]

⚠️ LEGAL DISCLAIMER: [full disclaimer text]

## Executive Summary
...

## Data Flow Map
[nodes + edges]

## Vendor Risk Register
| Vendor | Risk | DPA? | Action |

## Compliance Gaps
| Priority | Gap | Recommended Action |
|----------|-----|-------------------|

## Privacy Policy Inputs
[structured inputs]

## DSAR Process
[templates + timeline]

## Next Steps (for legal review)
1. ...
```

---

## Hard Rules

1. Include the full legal disclaimer in **every** output
2. Flag `[JURISDICTION UNCLEAR]` when rules differ between regions
3. **Never** mark any output as "compliant" — only lawyers can determine compliance
4. Always note the 30-day DSAR deadline in every DSAR template
5. Never guess at DPA requirements — state explicitly what is unknown
