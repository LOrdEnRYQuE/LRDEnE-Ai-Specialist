import { ToolResult } from "../types.js";
import { scanDependencies } from "../utils/security.js";

const KNOWN_VULNERABLE: Record<string, string> = {
  "lodash": "<4.17.21",
  "express": "<4.19.2",
  "axios": "<1.7.4",
  "next": "<14.2.10"
};

export async function dependency_risk_scan(repoPath: string): Promise<ToolResult<any>> {
  const { mode, packages } = await scanDependencies(repoPath);
  const risks: any[] = [];

  for (const pkg of packages) {
    const vulnRange = KNOWN_VULNERABLE[pkg.name];
    if (vulnRange) {
      risks.push({
        name: pkg.name,
        version: pkg.version,
        risk: "Known Vulnerability (CVE)",
        transitive: pkg.transitive,
        priority: pkg.transitive ? "MEDIUM" : "HIGH"
      });
    }
  }

  return {
    ok: true,
    summary: `Scanned ${packages.length} packages (${mode}). Found ${risks.length} risks.`,
    data: { mode, packageCount: packages.length, risks },
    evidence: risks.map(r => `${r.name}@${r.version} (${r.transitive ? 'transitive' : 'direct'})`)
  };
}
