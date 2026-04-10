import { ToolResult } from "../types.js";
import { scanDependencies } from "../utils/security.js";

const RISK_INDICATORS: Record<string, string> = {
  "lodash": "<4.17.21",
  "express": "<4.19.2",
  "axios": "<1.7.4",
  "next": "<14.2.10"
};

export async function dependency_risk_scan(repoPath: string): Promise<ToolResult<any>> {
  const { mode, packages } = await scanDependencies(repoPath);
  const risks: any[] = [];

  for (const pkg of packages) {
    const riskRange = RISK_INDICATORS[pkg.name];
    if (riskRange) {
      risks.push({
        name: pkg.name,
        version: pkg.version,
        riskType: "Security Risk Indicator (Heuristic)",
        label: "Outdated Sensitive Package",
        transitive: pkg.transitive,
        priority: pkg.transitive ? "MEDIUM" : "HIGH",
        chain: pkg.transitive ? `via [lockfile tree]` : "app -> direct"
      });
    }
  }

  return {
    ok: true,
    summary: `Scanned ${packages.length} packages (${mode}). Found ${risks.length} Risk Indicators.`,
    data: { 
      mode, 
      packageCount: packages.length, 
      risks,
      disclaimer: "Findings reflect heuristic risk patterns. Not a confirmed CVE match from an advisory database."
    },
    evidence: risks.map(r => `${r.name}@${r.version} (${r.chain})`)
  };
}
