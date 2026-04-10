import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { repo_scan } from "./tools/repo_scan.js";
import { architecture_plan } from "./tools/architecture_plan.js";
import { scaffold_feature } from "./tools/scaffold_feature.js";
import { crawl_site } from "./tools/crawl_site.js";
import { seo_audit } from "./tools/seo_audit.js";
import { schema_markup } from "./tools/schema_markup.js";
import { privacy_policy_inputs } from "./tools/privacy_policy_inputs.js";
import { data_flow_map } from "./tools/data_flow_map.js";
import { gdpr_gap_report } from "./tools/gdpr_gap_report.js";
import { dsar_pack } from "./tools/dsar_pack.js";

import { validateLicense, checkFeatureAccess } from "./utils/license.js";

/**
 * LRDEnE Specialist Agents MCP Server
 * 
 * Provides a production-ready toolkit for Web Development, SEO Auditing, 
 * and GDPR Compliance across Cursor, Windsurf, and Antigravity.
 */
const server = new Server(
  {
    name: "specialist-agents",
    version: "2.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const LICENSE_KEY = process.env.LICENSE_KEY;
const currentLicense = validateLicense(LICENSE_KEY);

/**
 * Registry of available professional tools.
 * Sorted by domain: Development, SEO, Compliance.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // ─── DEVELOPMENT TOOLS ──────────────────────────────────────────
      {
        name: "repo_scan",
        description: "Maps a local repository's frameworks, routes, and tech stack using glob patterns. [STARTER+]",
        inputSchema: {
          type: "object",
          properties: {
            repoPath: { type: "string", description: "Absolute path to the repository root." },
          },
          required: ["repoPath"],
        },
      },
      {
        name: "architecture_plan",
        description: "Generates a structured tech stack and component proposal based on project goals. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            goal: { type: "string", description: "The feature or application goal to architect." },
            context: { type: "object", description: "Output from repo_scan for stack-awareness." },
          },
          required: ["goal"],
        },
      },
      {
        name: "scaffold_feature",
        description: "Generates real Next.js/Tailwind boilerplate files (page, layout, loading, error). [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            featureName: { type: "string", description: "Name of the feature (e.g., 'dashboard')." },
            path: { type: "string", description: "Target directory path for generation." },
          },
          required: ["featureName", "path"],
        },
      },
      // ─── SEO TOOLS ──────────────────────────────────────────────────
      {
        name: "crawl_site",
        description: "Performs a live crawl of a URL to extract SEO metadata, headings, and link tree. [STARTER+]",
        inputSchema: {
          type: "object",
          properties: {
            url: { type: "string", description: "The public URL to inspect." },
          },
          required: ["url"],
        },
      },
      {
        name: "seo_audit",
        description: "Audits crawl results for technical SEO issues (title, meta, H1, links). [STARTER+]",
        inputSchema: {
          type: "object",
          properties: {
            crawlData: { type: "object", description: "The data returned from crawl_site." },
          },
          required: ["crawlData"],
        },
      },
      {
        name: "schema_markup",
        description: "Generates valid JSON-LD schema.org records for SEO optimization. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            pageType: { type: "string", description: "Type of schema (Article, Product, etc.)." },
            data: { type: "object", description: "Key-value pairs for the schema properties." },
          },
          required: ["pageType", "data"],
        },
      },
      // ─── COMPLIANCE TOOLS ───────────────────────────────────────────
      {
        name: "privacy_policy_inputs",
        description: "Extracts structured data required for drafting a legal privacy policy. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            productDesc: { type: "string", description: "Brief description of the product and its data usage." },
          },
          required: ["productDesc"],
        },
      },
      {
        name: "data_flow_map",
        description: "Traces personal data touchpoints and residency for jurisdictional audits. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            userFlows: { type: "array", items: { type: "string" }, description: "List of user actions involving data." },
          },
          required: ["userFlows"],
        },
      },
      {
        name: "gdpr_gap_report",
        description: "Audits compliance gaps against EU GDPR, UK GDPR, and CCPA standards. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            inputs: { type: "object", description: "Detailed jurisdictional and vendor inputs." },
          },
          required: ["inputs"],
        },
      },
      {
        name: "dsar_pack",
        description: "Generates professional templates for responding to Data Subject Access Requests. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            requestType: { type: "string", enum: ["access", "deletion", "portability"], description: "The type of DSAR." },
          },
          required: ["requestType"],
        },
      },
    ],
  };
});

/**
 * Primary Tool Execution Handler
 * 
 * Enforces tier-gating and executes specialist logic. 
 * Results are returned as formatted JSON for LLM consumption.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // 1. Tier Enforcement
  if (!checkFeatureAccess(currentLicense, name)) {
    return {
      content: [{ type: "text", text: `Error: Access denied for tool "${name}". This tool requires a PRO license.` }],
      isError: true,
    };
  }

  // 2. Execution
  try {
    switch (name) {
      case "repo_scan":
        return { content: [{ type: "text", text: JSON.stringify(await repo_scan(args?.repoPath as string), null, 2) }] };
      case "architecture_plan":
        return { content: [{ type: "text", text: JSON.stringify(await architecture_plan(args?.goal as string, args?.context as any), null, 2) }] };
      case "scaffold_feature":
        return { content: [{ type: "text", text: JSON.stringify(await scaffold_feature(args?.featureName as string, args?.path as string), null, 2) }] };
      case "crawl_site":
        return { content: [{ type: "text", text: JSON.stringify(await crawl_site(args?.url as string), null, 2) }] };
      case "seo_audit":
        return { content: [{ type: "text", text: JSON.stringify(await seo_audit(args?.crawlData as any), null, 2) }] };
      case "schema_markup":
        return { content: [{ type: "text", text: JSON.stringify(await schema_markup(args?.pageType as string, args?.data as any), null, 2) }] };
      case "privacy_policy_inputs":
        return { content: [{ type: "text", text: JSON.stringify(await privacy_policy_inputs(args?.productDesc as string), null, 2) }] };
      case "data_flow_map":
        return { content: [{ type: "text", text: JSON.stringify(await data_flow_map(args?.userFlows as string[]), null, 2) }] };
      case "gdpr_gap_report":
        return { content: [{ type: "text", text: JSON.stringify(await gdpr_gap_report(args?.inputs as any), null, 2) }] };
      case "dsar_pack":
        return { content: [{ type: "text", text: JSON.stringify(await dsar_pack(args?.requestType as string), null, 2) }] };
      default:
        throw new Error(`Tool not found: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

/**
 * Server Initialization
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("LRDEnE Specialist Agents MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal Server error:", error);
  process.exit(1);
});
