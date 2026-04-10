import { ToolResult, GdprGapResult, Jurisdiction } from "../types.js";

export async function gdpr_gap_report(inputs: {
  jurisdiction: Jurisdiction;
  vendorList?: string[];
  dataCategories?: string[];
  hasCookieBanner?: boolean;
  hasDsrFlow?: boolean;
  hasDoNotSellLink?: boolean; // CCPA specific
}): Promise<ToolResult<GdprGapResult>> {
  
  const { jurisdiction, vendorList = [], hasCookieBanner, hasDsrFlow, hasDoNotSellLink } = inputs;
  const gaps: GdprGapResult["gaps"] = [];

  // ─── Standard Checks (All Regions) ───────────
  if (vendorList.length > 0) {
    gaps.push({
      priority: "HIGH",
      category: "Vendors",
      description: `Analyzing ${vendorList.length} third-party processors for DPA compliance.`,
      remediation: "Ensure a signed Data Processing Agreement (DPA) exists for every listed vendor."
    });
  }

  if (!hasDsrFlow) {
    gaps.push({
      priority: "CRITICAL",
      category: "Rights",
      description: "No structured mechanism for Data Subject Request (DSAR) handling.",
      remediation: "Implement a request portal or dedicated email with a 30-day response SLA."
    });
  }

  // ─── Region Specific Logic ────────────────────
  if (jurisdiction === "CCPA") {
    if (!hasDoNotSellLink) {
      gaps.push({
        priority: "CRITICAL",
        category: "Transparency",
        description: "Missing 'Do Not Sell or Share My Personal Information' link.",
        remediation: "Add a clear, conspicuous link in the website footer as per CCPA/CPRA requirements."
      });
    }
    gaps.push({
      priority: "MEDIUM",
      category: "Notice",
      description: "12-month lookback requirement awareness.",
      remediation: "Ensure internal systems can retrieve data dating back 12 months for consumer requests."
    });
  }

  if (jurisdiction === "UK_GDPR") {
    gaps.push({
      priority: "HIGH",
      category: "Administrative",
      description: "UK-specific Information Commissioner's Office (ICO) registration check.",
      remediation: "Verify if the data controller is registered with the ICO and has paid the annual data protection fee."
    });
  }

  if (jurisdiction === "EU_GDPR") {
    if (!hasCookieBanner) {
      gaps.push({
        priority: "CRITICAL",
        category: "Consent",
        description: "Missing or non-compliant cookie consent mechanism.",
        remediation: "Implement a 'prior consent' banner that blocks non-essential cookies until opted-in."
      });
    }
  }

  return {
    ok: true,
    summary: `Jurisdiction audit complete for ${jurisdiction}. Found ${gaps.length} gaps.`,
    data: {
      jurisdiction,
      gaps
    },
    evidence: [
      `Selected Jurisdiction: ${jurisdiction}`,
      `Total Gaps identified: ${gaps.length}`
    ]
  };
}
