import * as fs from "fs";
import * as crypto from "crypto";
import { glob } from "glob";
import { ToolResult } from "../types.js";
import { SECRET_PATTERNS } from "../utils/security.js";
import { MAX_FILE_SIZE_BYTES } from "../utils/constants.js";

const EXCLUSION_GLOBS = [
  "**/node_modules/**", "**/dist/**", "**/.git/**", "**/.next/**",
  "**/build/**", "**/coverage/**", "**/.cache/**", "**/out/**", "**/tmp/**",
  "**/*.min.js", "**/*.map", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif",
  "**/*.webp", "**/*.pdf", "**/*.zip", "**/*.tar", "**/*.gz", "**/*.woff", "**/*.woff2"
];

/**
 * Deterministic fingerprint for secrets (SHA-256)
 */
function getFingerprint(secret: string): string {
  return crypto.createHash("sha256").update(secret).digest("hex").substring(0, 8);
}

/**
 * Redacts secrets to safe fingerprint format
 */
function redactMatch(match: string, type: string): string {
  const fp = getFingerprint(match);
  return `${type.toLowerCase()} [fp:${fp}]`;
}

export async function secret_scan(repoPath: string): Promise<ToolResult<any>> {
  const findings: any[] = [];
  const files = await glob("**/*", {
    cwd: repoPath,
    ignore: EXCLUSION_GLOBS,
    nodir: true
  });

  for (const file of files) {
    const fullPath = `${repoPath}/${file}`;
    const stats = fs.statSync(fullPath);
    
    // Safety check: Skip large files
    if (stats.size > MAX_FILE_SIZE_BYTES) continue;

    const content = fs.readFileSync(fullPath, "utf-8");
    for (const [type, pattern] of Object.entries(SECRET_PATTERNS)) {
      const matches = content.match(pattern);
      if (matches) {
        for (const match of matches) {
          findings.push({
            file,
            type,
            redacted: redactMatch(match, type),
            fingerprint: getFingerprint(match),
            priority: type === "PRIVATE_KEY" || type === "GITHUB_PAT" ? "CRITICAL" : "HIGH"
          });
        }
      }
    }
  }

  return {
    ok: true,
    summary: findings.length > 0 
      ? `Detected ${findings.length} potential secret exposures. Full redaction enabled.` 
      : "No secrets detected in source files.",
    data: { findings: findings.map(({file, type, redacted, priority}) => ({ file, type, redacted, priority })) },
    evidence: findings.map(f => `${f.redacted} found in ${f.file}`)
  };
}
