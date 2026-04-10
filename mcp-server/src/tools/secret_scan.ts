import * as fs from "fs";
import { glob } from "glob";
import { ToolResult } from "../types.js";
import { SECRET_PATTERNS } from "../utils/security.js";

export async function secret_scan(repoPath: string): Promise<ToolResult<any>> {
  const findings: any[] = [];
  const files = await glob("**/*.{ts,js,tsx,jsx,json,env,yml,yaml,md}", {
    cwd: repoPath,
    ignore: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    nodir: true
  });

  for (const file of files) {
    const content = fs.readFileSync(`${repoPath}/${file}`, "utf-8");
    for (const [type, pattern] of Object.entries(SECRET_PATTERNS)) {
      const matches = content.match(pattern);
      if (matches) {
        findings.push({
          file,
          type,
          count: matches.length,
          priority: type === "PRIVATE_KEY" || type === "GITHUB_PAT" ? "CRITICAL" : "HIGH"
        });
      }
    }
  }

  return {
    ok: true,
    summary: findings.length > 0 
      ? `Detected ${findings.length} files with potential secrets.` 
      : "No secrets detected in source files.",
    data: { findings },
    evidence: findings.map(f => `${f.type} found in ${f.file}`)
  };
}
