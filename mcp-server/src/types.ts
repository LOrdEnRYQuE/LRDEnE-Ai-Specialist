export type ToolResult<T> = {
  ok: boolean;
  summary: string;
  data?: T;
  warnings?: string[];
  evidence?: string[];
};

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
