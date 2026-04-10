import { ToolResult } from "../types.js";
import { Logger } from "../utils/logger.js";

export async function hardening_report(
  projectName: string,
  projectPath: string,
  findings: any[]
): Promise<ToolResult<any>> {
  
  const severitySummary = {
    critical: findings.filter(f => f.priority === "CRITICAL").length,
    high: findings.filter(f => f.priority === "HIGH").length,
    medium: findings.filter(f => f.priority === "MEDIUM").length,
    low: findings.filter(f => f.priority === "LOW" || f.priority === "NONE").length || 0,
  };

  const auditId = await Logger.log({
    agentId: "security-hardening-auditor",
    projectName,
    projectPath,
    severitySummary,
    findings,
    evidence: findings.map(f => `${f.type || f.header || f.id} in ${f.file || 'config'}`)
  });

  return {
    ok: true,
    summary: `Hardening audit complete for ${projectName}. Audit ID: ${auditId}.`,
    data: {
      auditId,
      projectName,
      severitySummary,
      findings
    }
  };
}
