import * as fs from "fs";
import * as path from "path";

/**
 * Regex dictionary for common secrets.
 */
export const SECRET_PATTERNS: Record<string, RegExp> = {
  AWS_KEY: /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/g,
  AWS_SECRET: /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/g,
  STRIPE_KEY: /sk_live_[0-9a-zA-Z]{24}/g,
  GITHUB_PAT: /ghp_[0-9a-zA-Z]{36}/g,
  PRIVATE_KEY: /-----BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY-----/g,
  GENERIC_SECRET: /(password|secret|key|token|auth|pwd)\s*[:=]\s*["'][^"']{8,}["']/gi
};

/**
 * Deep scan for dependencies in lockfiles.
 */
export async function scanDependencies(repoPath: string): Promise<{
  mode: "lockfile-deep" | "package-json-fallback";
  packages: Array<{ name: string; version: string; transitive: boolean }>;
}> {
  const lockfiles = ["package-lock.json", "pnpm-lock.yaml", "yarn.lock"];
  let foundLockfile = "";

  for (const f of lockfiles) {
    if (fs.existsSync(path.join(repoPath, f))) {
      foundLockfile = f;
      break;
    }
  }

  if (foundLockfile === "package-lock.json") {
    const content = JSON.parse(fs.readFileSync(path.join(repoPath, foundLockfile), "utf-8"));
    const packages: any[] = [];
    
    // v2/v3 package-lock parsing
    const pkgSource = content.packages || {};
    for (const [pkgPath, pkg] of Object.entries(pkgSource)) {
      if (!pkgPath) continue;
      const name = pkgPath.replace("node_modules/", "");
      if (name && (pkg as any).version) {
        packages.push({ name, version: (pkg as any).version, transitive: pkgPath.includes("node_modules/") });
      }
    }
    return { mode: "lockfile-deep", packages };
  }

  // Fallback to package.json
  const pkgJsonPath = path.join(repoPath, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    const content = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    const deps = { ...content.dependencies, ...content.devDependencies };
    const packages = Object.entries(deps).map(([name, version]) => ({
      name,
      version: (version as string).replace(/[\^~]/, ""),
      transitive: false
    }));
    return { mode: "package-json-fallback", packages };
  }

  return { mode: "package-json-fallback", packages: [] };
}
