import * as fs from "fs";
import { ToolResult } from "../types.js";

export async function security_headers_audit(repoPath: string): Promise<ToolResult<any>> {
  const configFiles = ["next.config.js", "next.config.mjs", "vercel.json", "netlify.toml"];
  const findings: any[] = [];

  const headers = [
    { name: "Content-Security-Policy", regex: /Content-Security-Policy/i },
    { name: "Strict-Transport-Security", regex: /Strict-Transport-Security/i },
    { name: "X-Frame-Options", regex: /X-Frame-Options/i },
    { name: "X-Content-Type-Options", regex: /X-Content-Type-Options/i }
  ];

  for (const file of configFiles) {
    const fullPath = `${repoPath}/${file}`;
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const h of headers) {
        if (!h.regex.test(content)) {
          findings.push({ header: h.name, status: "SOURCE_NOT_CONFIGURED", priority: "MEDIUM", note: "Not found in codebase; verify at runtime/proxy level." });
        } else {
          findings.push({ header: h.name, status: "CONFIGURED_IN_SOURCE", priority: "NONE" });
        }
      }
    }
  }

  return {
    ok: true,
    summary: `Audited security headers. ${findings.filter(f => f.status === "MISSING").length} missing in config.`,
    data: { findings }
  };
}
