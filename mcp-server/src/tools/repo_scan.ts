import { glob } from "glob";
import * as fs from "fs";
import * as path from "path";
import { ToolResult, RepoScanResult } from "../types.js";

const FRAMEWORK_SIGNALS: Record<string, string[]> = {
  "Next.js":    ["next.config.*", "app/layout.*", "pages/_app.*"],
  "React":      ["src/App.*", "index.jsx", "index.tsx"],
  "Vite":       ["vite.config.*"],
  "Astro":      ["astro.config.*"],
  "SvelteKit":  ["svelte.config.*"],
  "NestJS":     ["nest-cli.json"],
  "Express":    ["app.js", "server.js", "src/server.*"],
  "Fastify":    ["fastify.config.*"],
};

const DB_SIGNALS: Record<string, string[]> = {
  "Prisma":     ["prisma/schema.prisma"],
  "Drizzle":    ["drizzle.config.*"],
  "TypeORM":    ["ormconfig.*"],
  "Mongoose":   ["src/models/*.ts", "src/models/*.js"],
};

const DEPLOY_SIGNALS: Record<string, string[]> = {
  "Vercel":       ["vercel.json", ".vercel"],
  "Netlify":      ["netlify.toml"],
  "Cloudflare":   ["wrangler.toml", "wrangler.json"],
  "Docker":       ["Dockerfile", "docker-compose.*"],
  "GitHub Actions": [".github/workflows/*.yml"],
};

async function detect(repoPath: string, signals: Record<string, string[]>): Promise<string[]> {
  const found: string[] = [];
  for (const [name, patterns] of Object.entries(signals)) {
    for (const pattern of patterns) {
      const matches = await glob(pattern, { cwd: repoPath, nodir: true });
      if (matches.length > 0) { found.push(name); break; }
    }
  }
  return found;
}

async function findRoutes(repoPath: string): Promise<string[]> {
  const patterns = ["app/**/page.*", "app/**/route.*", "pages/**/*.{ts,tsx,js,jsx}"];
  const routes: Set<string> = new Set();
  for (const pattern of patterns) {
    const files = await glob(pattern, { cwd: repoPath, nodir: true });
    for (const f of files) {
      const route = "/" + f
        .replace(/^(app|pages)\//, "")
        .replace(/\/(page|route)\.(tsx|ts|jsx|js)$/, "")
        .replace(/\.(tsx|ts|jsx|js)$/, "")
        .replace(/\/index$/, "");
      routes.add(route || "/");
    }
  }
  return Array.from(routes).slice(0, 20);
}

async function findApiEndpoints(repoPath: string): Promise<string[]> {
  const files = await glob("app/api/**/route.{ts,js}", { cwd: repoPath, nodir: true });
  return files.map(f => {
    const route = "/" + f.replace(/\/route\.(ts|js)$/, "");
    return `API: ${route}`;
  }).slice(0, 20);
}

async function detectPackageManager(repoPath: string): Promise<string[]> {
  const pms: string[] = [];
  if (fs.existsSync(path.join(repoPath, "pnpm-lock.yaml"))) pms.push("pnpm");
  if (fs.existsSync(path.join(repoPath, "yarn.lock")))       pms.push("yarn");
  if (fs.existsSync(path.join(repoPath, "package-lock.json"))) pms.push("npm");
  if (fs.existsSync(path.join(repoPath, "bun.lockb")))       pms.push("bun");
  return pms.length ? pms : ["unknown"];
}

export async function repo_scan(repoPath: string): Promise<ToolResult<RepoScanResult>> {
  const abs = path.resolve(repoPath);

  if (!fs.existsSync(abs)) {
    return { ok: false, summary: `Path not found: ${abs}`, warnings: ["Ensure the path exists and is accessible."] };
  }

  const [frameworks, dbIndicators, deploymentIndicators, packageManagers, routes, apiEndpoints] =
    await Promise.all([
      detect(abs, FRAMEWORK_SIGNALS),
      detect(abs, DB_SIGNALS),
      detect(abs, DEPLOY_SIGNALS),
      detectPackageManager(abs),
      findRoutes(abs),
      findApiEndpoints(abs),
    ]);

  return {
    ok: true,
    summary: `Scanned ${abs}. Found ${frameworks.length} frameworks, ${routes.length} routes, ${apiEndpoints.length} API endpoints.`,
    data: { frameworks, packageManagers, routes, apiEndpoints, dbIndicators, deploymentIndicators },
  };
}
