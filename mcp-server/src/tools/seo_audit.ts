import { ToolResult } from "../types.js";

export async function seo_audit(crawlData: {
  url: string;
  title: string;
  meta: Record<string, string>;
  headings: string[];
  links: string[];
  warnings?: string[];
}): Promise<ToolResult<any>> {

  const issues: Array<{ priority: string; category: string; issue: string; fix: string }> = [];

  // Pre-populate from crawl warnings
  for (const w of crawlData.warnings ?? []) {
    issues.push({ priority: "CRITICAL", category: "Technical", issue: w, fix: "Add the missing element immediately." });
  }

  // Title
  if (!crawlData.title) {
    issues.push({ priority: "CRITICAL", category: "On-page", issue: "Missing title tag.", fix: "Add a descriptive <title> (50–60 chars)." });
  } else if (crawlData.title.length > 60) {
    issues.push({ priority: "HIGH", category: "On-page", issue: `Title too long (${crawlData.title.length} chars).`, fix: "Trim to under 60 characters." });
  } else if (crawlData.title.length < 30) {
    issues.push({ priority: "MEDIUM", category: "On-page", issue: `Title too short (${crawlData.title.length} chars).`, fix: "Expand to 50–60 characters." });
  }

  // Meta description
  const desc = crawlData.meta["description"] || "";
  if (!desc) {
    issues.push({ priority: "HIGH", category: "On-page", issue: "Missing meta description.", fix: "Add a compelling meta description (150–160 chars)." });
  } else if (desc.length > 160) {
    issues.push({ priority: "MEDIUM", category: "On-page", issue: `Meta description too long (${desc.length} chars).`, fix: "Trim to 160 characters." });
  }

  // H1
  const h1s = crawlData.headings.filter(h => h.startsWith("H1:"));
  if (h1s.length === 0) {
    issues.push({ priority: "CRITICAL", category: "On-page", issue: "No H1 heading found.", fix: "Add exactly one <h1> per page." });
  } else if (h1s.length > 1) {
    issues.push({ priority: "HIGH", category: "On-page", issue: `Multiple H1 tags (${h1s.length}).`, fix: "Reduce to exactly one <h1>." });
  }

  // OG tags
  if (!crawlData.meta["og:title"]) {
    issues.push({ priority: "MEDIUM", category: "Social", issue: "Missing og:title.", fix: "Add Open Graph meta tags for social sharing." });
  }

  // Sort: CRITICAL → HIGH → MEDIUM → LOW
  const priority = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
  issues.sort((a, b) => (priority[a.priority as keyof typeof priority] ?? 3) - (priority[b.priority as keyof typeof priority] ?? 3));

  const quickWins = issues.slice(0, 3).map(i => `• [${i.priority}] ${i.issue}`);

  return {
    ok: true,
    summary: `SEO audit complete for ${crawlData.url}. Found ${issues.length} issue(s).`,
    data: { url: crawlData.url, issues, total: issues.length },
    evidence: ["🏆 Top 3 Quick Wins:", ...quickWins],
    warnings: issues.filter(i => i.priority === "CRITICAL").map(i => i.issue),
  };
}
