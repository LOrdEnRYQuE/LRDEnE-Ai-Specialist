# Antigravity Workflow: Audit SEO

1. Activate the `SEO Growth Auditor` skill.
2. Collect: domain, target keywords, country, and language from the user.
3. Run `crawl_site` on the primary domain.
4. Run `seo_audit` on the crawl data.
5. For each key page, run `schema_markup` to propose JSON-LD.
6. Produce `seo-audit.md` with issues sorted Critical → High → Medium → Low.
7. Highlight the top 3 quick wins at the top of the report.
