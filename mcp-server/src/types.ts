export type ToolResult<T> = {
  ok: boolean;
  summary: string;
  data?: T;
  warnings?: string[];
  evidence?: string[];
};

export type Jurisdiction = "EU_GDPR" | "UK_GDPR" | "CCPA";

export interface RepoScanResult {
  frameworks: string[];
  packageManagers: string[];
  routes: string[];
  apiEndpoints: string[];
  dbIndicators: string[];
  deploymentIndicators: string[];
}

export interface ArchitecturePlanResult {
  overview: string;
  components: Array<{
    name: string;
    description: string;
    technology: string;
  }>;
  dataFlow: string;
  risks: string[];
}

export interface CrawlResult {
  url: string;
  title: string;
  meta: Record<string, string>;
  headings: string[];
  links: string[];
}

export interface GdprGapResult {
  jurisdiction: Jurisdiction;
  gaps: Array<{
    priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    category: string;
    description: string;
    remediation: string;
  }>;
}

export interface DataFlowResult {
  nodes: Array<{ id: string; label: string; type?: string }>;
  edges: Array<{ from: string; to: string; label: string; residency?: string }>;
}
