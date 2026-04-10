import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

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

const server = new Server(
  {
    name: "specialist-agents",
    version: "1.1.0",
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
 * List available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "repo_scan",
        description: "Scans a local repository for frameworks, routes, and tech stack indicators. [STARTER+]",
        inputSchema: {
          type: "object",
          properties: {
            repoPath: { type: "string" },
          },
          required: ["repoPath"],
        },
      },
      {
        name: "architecture_plan",
        description: "Generates a structured architecture proposal for a given feature or app. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            goal: { type: "string" },
            context: { type: "object" },
          },
          required: ["goal"],
        },
      },
      {
        name: "scaffold_feature",
        description: "Creates file stubs and folder structure for a new feature. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            featureName: { type: "string" },
            path: { type: "string" },
          },
          required: ["featureName", "path"],
        },
      },
      {
        name: "crawl_site",
        description: "Crawls a public URL to extract metadata and page structure. [STARTER+]",
        inputSchema: {
          type: "object",
          properties: {
            url: { type: "string" },
          },
          required: ["url"],
        },
      },
      {
        name: "seo_audit",
        description: "Performs a technical SEO audit on crawl results. [STARTER+]",
        inputSchema: {
          type: "object",
          properties: {
            crawlData: { type: "object" },
          },
          required: ["crawlData"],
        },
      },
      {
        name: "schema_markup",
        description: "Generates JSON-LD schema markup for a specific page type. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            pageType: { type: "string" },
            data: { type: "object" },
          },
          required: ["pageType", "data"],
        },
      },
      {
        name: "privacy_policy_inputs",
        description: "Collects structured inputs for generating a privacy policy draft. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            productDesc: { type: "string" },
          },
          required: ["productDesc"],
        },
      },
      {
        name: "data_flow_map",
        description: "Maps personal data touchpoints across user flows. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            userFlows: { type: "array", items: { type: "string" } },
          },
          required: ["userFlows"],
        },
      },
      {
        name: "gdpr_gap_report",
        description: "Identifies compliance gaps based on product data. [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            inputs: { type: "object" },
          },
          required: ["inputs"],
        },
      },
      {
        name: "dsar_pack",
        description: "Generates templates for responding to Data Subject Access Requests (DSAR). [PRO+]",
        inputSchema: {
          type: "object",
          properties: {
            requestType: { type: "string" },
          },
          required: ["requestType"],
        },
      },
    ],
  };
});

/**
 * Handle tool calls.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!checkFeatureAccess(currentLicense, name)) {
    return {
      content: [{ type: "text", text: `Error: Access denied for tool "${name}". This tool requires a PRO license.` }],
      isError: true,
    };
  }

  try {
    switch (name) {
      case "repo_scan":
        return { content: [{ type: "text", text: JSON.stringify(await repo_scan(args?.repoPath as string), null, 2) }] };
      case "architecture_plan":
        return { content: [{ type: "text", text: JSON.stringify(await architecture_plan(args?.goal as string, args?.context), null, 2) }] };
      case "scaffold_feature":
        return { content: [{ type: "text", text: JSON.stringify(await scaffold_feature(args?.featureName as string, args?.path as string), null, 2) }] };
      case "crawl_site":
        return { content: [{ type: "text", text: JSON.stringify(await crawl_site(args?.url as string), null, 2) }] };
      case "seo_audit":
        return { content: [{ type: "text", text: JSON.stringify(await seo_audit(args?.crawlData), null, 2) }] };
      case "schema_markup":
        return { content: [{ type: "text", text: JSON.stringify(await schema_markup(args?.pageType as string, args?.data), null, 2) }] };
      case "privacy_policy_inputs":
        return { content: [{ type: "text", text: JSON.stringify(await privacy_policy_inputs(args?.productDesc as string), null, 2) }] };
      case "data_flow_map":
        return { content: [{ type: "text", text: JSON.stringify(await data_flow_map(args?.userFlows as string[]), null, 2) }] };
      case "gdpr_gap_report":
        return { content: [{ type: "text", text: JSON.stringify(await gdpr_gap_report(args?.inputs), null, 2) }] };
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
 * Start the server using stdio transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Specialist Agents MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
