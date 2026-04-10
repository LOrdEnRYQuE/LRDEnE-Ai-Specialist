import * as fs from "fs";
import * as path from "path";
import { ToolResult, ArchitecturePlanResult } from "../types.js";

export async function architecture_plan(goal: string, context?: {
  frameworks?: string[];
  dbIndicators?: string[];
  deploymentIndicators?: string[];
}): Promise<ToolResult<ArchitecturePlanResult>> {

  const stack = context?.frameworks ?? [];
  const db    = context?.dbIndicators ?? [];
  const deploy = context?.deploymentIndicators ?? [];

  const components = [
    { name: "Frontend", description: "User interface layer", technology: stack[0] ?? "React/Next.js" },
    { name: "API Layer", description: "Business logic and data access", technology: stack.includes("NestJS") ? "NestJS" : "Next.js API Routes" },
    { name: "Database", description: "Persistent storage", technology: db[0] ?? "PostgreSQL" },
    { name: "Auth", description: "Authentication and session management", technology: "NextAuth / Clerk" },
  ];

  if (deploy.includes("Cloudflare")) {
    components.push({ name: "Edge Layer", description: "CDN and edge compute", technology: "Cloudflare Workers" });
  }

  return {
    ok: true,
    summary: `Architecture plan generated for: "${goal}"`,
    data: {
      overview: `A modern full-stack application to: ${goal}. Uses ${stack.join(", ") || "standard web stack"} with ${db.join(", ") || "relational database"}.`,
      components,
      dataFlow: "Client → CDN → API Gateway → Application Server → Database",
      risks: [
        "Ensure environment variables are validated at startup",
        "Add rate limiting to all public API endpoints",
        db.includes("Prisma") ? "Run Prisma migrations as part of CI/CD" : "Implement a database migration strategy",
      ],
    },
  };
}
