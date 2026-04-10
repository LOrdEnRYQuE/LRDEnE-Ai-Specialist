import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

const LOG_DIR = path.resolve("./.lrdene/logs/audits");

export interface AuditLogEntry {
  auditId: string;
  agentId: string;
  projectName: string;
  projectPath: string;
  timestamp: string;
  severitySummary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  findings: any[];
  evidence?: string[];
  toolVersion: string;
}

export class Logger {
  static async log(entry: Omit<AuditLogEntry, "auditId" | "timestamp" | "toolVersion">) {
    const auditId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const toolVersion = "2.2.0"; // Specialized version for v4.0

    const fullEntry: AuditLogEntry = {
      auditId,
      timestamp,
      toolVersion,
      ...entry
    };

    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    const filename = `${timestamp.replace(/[:.]/g, "-")}_${entry.projectName}_${entry.agentId}.json`;
    const filePath = path.join(LOG_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(fullEntry, null, 2));
    
    return auditId;
  }

  static async getLogs(): Promise<AuditLogEntry[]> {
    if (!fs.existsSync(LOG_DIR)) return [];
    
    const files = fs.readdirSync(LOG_DIR).filter(f => f.endsWith(".json"));
    return files.map(f => JSON.parse(fs.readFileSync(path.join(LOG_DIR, f), "utf-8")));
  }
}
