import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { ToolResult, CrawlResult } from "../types.js";

export async function crawl_site(url: string): Promise<ToolResult<CrawlResult>> {
  let html: string;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (LRDEnE-SEO-Bot/1.0)" },
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return { ok: false, summary: `HTTP ${res.status} fetching ${url}`, warnings: [`Status: ${res.status}`] };
    }

    html = await res.text();
  } catch (err: any) {
    return { ok: false, summary: `Failed to fetch ${url}: ${err.message}`, warnings: [err.message] };
  }

  const $ = cheerio.load(html);

  const title   = $("title").first().text().trim();
  const meta: Record<string, string> = {};

  $("meta").each((_, el) => {
    const name    = $(el).attr("name") || $(el).attr("property") || "";
    const content = $(el).attr("content") || "";
    if (name && content) meta[name] = content;
  });

  const headings: string[] = [];
  $("h1,h2,h3").each((_, el) => {
    const tag  = el.tagName.toUpperCase();
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (text) headings.push(`${tag}: ${text}`);
  });

  const links: string[] = [];
  const base = new URL(url);
  $("a[href]").each((_, el) => {
    try {
      const href = new URL($(el).attr("href")!, base).href;
      links.push(href);
    } catch {
      // skip malformed hrefs
    }
  });
  const uniqueLinks = [...new Set(links)].slice(0, 50);

  const warnings: string[] = [];
  if (!title) warnings.push("Missing <title> tag.");
  if (!meta["description"]) warnings.push("Missing meta description.");
  if (!$("h1").length) warnings.push("No <h1> found on page.");
  if (!$('link[rel="canonical"]').length) warnings.push("No canonical tag found.");

  return {
    ok: true,
    summary: `Crawled ${url} — found ${headings.length} headings, ${uniqueLinks.length} links.`,
    data: { url, title, meta, headings, links: uniqueLinks },
    warnings: warnings.length ? warnings : undefined,
    evidence: [`Title: ${title || "(none)"}`, `Meta count: ${Object.keys(meta).length}`],
  };
}
