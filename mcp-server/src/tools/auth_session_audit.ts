import * as fs from "fs";
import { glob } from "glob";
import { ToolResult } from "../types.js";

export async function auth_session_audit(repoPath: string): Promise<ToolResult<any>> {
  const findings: any[] = [];
  const files = await glob("**/*.{ts,js,tsx,jsx,json,yaml}", {
    cwd: repoPath,
    ignore: ["**/node_modules/**"],
    nodir: true
  });

  const patterns = [
    { id: "SECURE_COOKIE_INDICATOR", regex: /httpOnly:\s*false/g, desc: "Possible missing httpOnly flag on cookie", prio: "HIGH" },
    { id: "UNSAFE_SAMESITE_INDICATOR", regex: /sameSite:\s*['"]none['"]/g, desc: "Suspicious sameSite config without evidence of secure check", prio: "MEDIUM" },
    { id: "WEAK_PASS_INDICATOR", regex: /minLength:\s*[0-7][^0-9]/g, desc: "Weak password length indicator detected", prio: "MEDIUM" }
  ];

  for (const file of files) {
    const content = fs.readFileSync(`${repoPath}/${file}`, "utf-8");
    for (const p of patterns) {
      if (p.regex.test(content)) {
        findings.push({ file, ...p });
      }
    }
  }

  return {
    ok: true,
    summary: findings.length > 0 
      ? `Found ${findings.length} potential auth/session security issues.` 
      : "No critical auth/session configuration errors found.",
    data: { findings }
  };
}
