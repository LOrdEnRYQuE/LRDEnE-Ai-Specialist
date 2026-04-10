# CHANGELOG

All notable changes to the LRDEnE Specialist Agents Kit will be documented here.

Format: [Semantic Versioning](https://semver.org)

---

## [1.0.0] — 2026-04-10

### Added

#### Core
- Host-agnostic YAML agent definitions:
  - `webapp-e2e.yaml` — WebApp Architect specialist
  - `seo-optimizer.yaml` — SEO Growth Auditor specialist
  - `legal-gdpr.yaml` — GDPR Compliance Copilot specialist
- Policy documents: `approval-policy.md`, `security-policy.md`, `legal-disclaimer.md`
- Workflow guides: `build-feature.md`, `audit-seo.md`, `audit-gdpr.md`

#### MCP Server (`@lrdene/specialist-mcp-server`)
- TypeScript MCP server built on `@modelcontextprotocol/sdk`
- 10 registered tools:
  - `repo_scan` — detects frameworks, routes, and stack indicators
  - `architecture_plan` — produces structured architecture proposals
  - `scaffold_feature` — creates file stubs for new features
  - `crawl_site` — extracts page tree, metadata, and headings
  - `seo_audit` — audits crawl results for technical SEO issues
  - `schema_markup` — generates JSON-LD schema.org records
  - `privacy_policy_inputs` — collects privacy policy draft inputs
  - `data_flow_map` — maps personal data touchpoints
  - `gdpr_gap_report` — identifies GDPR compliance gaps
  - `dsar_pack` — generates DSAR response templates
- Shared `ToolResult<T>` generic contract in `types.ts`
- Stdio transport for universal IDE compatibility

#### Adapters
- **Cursor**: `.mdc` rules + SKILL.md files + `plugin.json` manifest
- **Windsurf**: `.agents/skills/` SKILL.md files + `AGENTS.md` + hooks + workflows
- **Antigravity**: `.agents/skills/` SKILL.md files + global rules + workflows
- **Lovable**: connector setup guide + three prompt templates
- **Bolt**: connector setup guide + three prompt templates

#### Documentation
- `docs/install-cursor.md`
- `docs/install-windsurf.md`
- `docs/install-antigravity.md`
- `docs/use-with-lovable.md`
- `docs/use-with-bolt.md`
- `setup.sh` — one-command onboarding script

---

## Roadmap

- [ ] v1.1 — Live `crawl_site` implementation using `puppeteer` or `playwright`
- [ ] v1.1 — Live `repo_scan` using `glob` + AST parsing
- [ ] v1.2 — Tier-gating mechanism (Starter / Pro / Agency feature flags)
- [ ] v1.3 — npm package release (`@lrdene/specialist-mcp-server`)
- [ ] v2.0 — Custom jurisdiction packs for UK GDPR, CCPA, and PIPEDA
