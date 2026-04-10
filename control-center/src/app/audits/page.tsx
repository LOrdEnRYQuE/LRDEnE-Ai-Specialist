// Server Component for fetching audit logs directly from the filesystem
import * as fs from "fs";
import { AUDIT_LOG_DIR } from "../../../../mcp-server/src/utils/constants";
import { AuditLogEntry } from "../../../../mcp-server/src/utils/logger";
import AuditLogsTable from "./AuditLogsTable";
import { ShieldCheck } from "lucide-react";

async function getAuditLogs(): Promise<AuditLogEntry[]> {
  if (!fs.existsSync(AUDIT_LOG_DIR)) return [];
  
  try {
    const files = fs.readdirSync(AUDIT_LOG_DIR).filter(f => f.endsWith(".json"));
    const logs = files.map(f => {
      const content = fs.readFileSync(`${AUDIT_LOG_DIR}/${f}`, "utf-8");
      return JSON.parse(content) as AuditLogEntry;
    });
    // Sort by timestamp descending
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error("Error reading logs:", error);
    return [];
  }
}

export default async function AuditsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-outfit font-bold tracking-tight">Live Audit Logs</h1>
          <p className="text-neutral-400">Centralized history of all specialist scans (v4.0.3 Hardened).</p>
        </div>
      </header>

      {/* Persistence Note */}
      <div className="p-6 glass-card bg-indigo-500/5 flex items-center gap-4 border-indigo-500/10 mb-8">
         <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-sm">Server-Side Verified Storage</h4>
            <p className="text-xs text-neutral-400">Total persistent logs found: <strong>{logs.length}</strong>. Audit history is securely read from the Kit filesystem on the server.</p>
         </div>
      </div>

      <AuditLogsTable initialLogs={logs} />
    </div>
  );
}
