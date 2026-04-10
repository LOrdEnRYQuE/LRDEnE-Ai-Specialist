# Windsurf Workflow: Audit SEO

1. Run `crawl_site` to map the full page tree.
2. Run `seo_audit` on the crawl results.
3. Identify missing or broken: titles, meta descriptions, canonical tags, sitemap, robots.txt.
4. Map each page to a primary search intent.
5. Use `schema_markup` to generate JSON-LD for relevant pages.
6. Produce `seo-audit.md` with findings sorted by priority.
