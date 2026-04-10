# /audit-seo — SEO Growth Auditor Workflow

Trigger: `/audit-seo` or "audit my SEO", "check my metadata", "generate schema"

---

## Activation

🤖 **Applying knowledge of `@[seo-growth-auditor]`...**

---

## Phase 1: Gather Inputs

Ask the user for:
1. **URL** — the page or domain to audit
2. **Target keywords** — 3–5 primary terms
3. **Country + language** — e.g. "Romania / Romanian"
4. **Stack / CMS** — e.g. Next.js, WordPress, Webflow

> Do not proceed until you have at minimum: URL.

---

## Phase 2: Crawl

```
Tool: crawl_site(url)
```

Review output:
- Is the title tag present and within 50–60 chars?
- Is the meta description present and within 150–160 chars?
- Is there exactly one H1?
- Are canonical and OG tags present?
- Any auto-detected warnings?

---

## Phase 3: Audit

```
Tool: seo_audit(crawlData)
```

The tool returns issues sorted Critical → High → Medium → Low.

Label each finding as:
- `[CONFIRMED]` — directly verified from crawl data
- `[HEURISTIC]` — inferred, requires manual check

---

## Phase 4: Intent Mapping

For each key page, assign a primary search intent:
- **Informational** — user wants to learn something
- **Navigational** — user wants to find a specific page/brand
- **Transactional** — user wants to buy / sign up
- **Commercial** — user is comparing options

---

## Phase 5: Schema Generation

For pages missing structured data:

```
Tool: schema_markup(pageType, { name, description, ... })
```

Common `pageType` values: `WebSite`, `Article`, `Product`, `LocalBusiness`, `FAQPage`, `BreadcrumbList`

Output must be valid JSON-LD blocks, ready to embed in `<head>`.

---

## Phase 6: Report

Produce `seo-audit.md`:

```markdown
# SEO Audit — [Domain] — [Date]

## ⚡ Top 3 Quick Wins
1. [CRITICAL] ...
2. [HIGH] ...
3. [HIGH] ...

## Full Findings

| Priority    | Category  | Issue | Fix |
|-------------|-----------|-------|-----|
| CRITICAL    | Technical | ...   | ... |

## Schema Recommendations

```json
{
  "@context": "https://schema.org",
  "@type": "...",
  ...
}
```

## Core Web Vitals Targets
| Metric | Target  |
|--------|---------|
| LCP    | < 2.5s  |
| INP    | < 200ms |
| CLS    | < 0.1   |
```

---

## Hard Rules

1. **Never** fabricate rankings, traffic, or CTR data
2. **Always** label `[CONFIRMED]` vs `[HEURISTIC]`
3. **Always** put Quick Wins at the top
4. Schema output must be valid — no placeholder values left in
