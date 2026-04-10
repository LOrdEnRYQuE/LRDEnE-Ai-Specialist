import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { AUDIT_LOG_DIR } from "./constants.js";

/**
 * Centralized Audit Log Schema (v1)
 */
export interface AuditLogEntry {
  schemaVersion: number;
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
  static async log(entry: Omit<AuditLogEntry, "auditId" | "timestamp" | "toolVersion" | "schemaVersion">) {
    const auditId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const toolVersion = "2.2.0"; // Security Pack Version
    const schemaVersion = 1;

    const fullEntry: AuditLogEntry = {
      schemaVersion,
      auditId,
      timestamp,
      toolVersion,
      ...entry
    };

    if (!fs.existsSync(AUDIT_LOG_DIR)) {
      fs.mkdirSync(AUDIT_LOG_DIR, { recursive: true });
    }

    // Filename pattern: YYYY-MM-DDTHH-mm-ss_PROJECT_AGENT.json
    const safeProjectName = entry.projectName.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    const filename = `${timestamp.replace(/[:.]/g, "-")}_${safeProjectName}_${entry.agentId}.json`;
    const filePath = path.join(AUDIT_LOG_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(fullEntry, null, 2));
    
    return auditId;
  }

  static async getLogs(): Promise<AuditLogEntry[]> {
    if (!fs.existsSync(AUDIT_LOG_DIR)) return [];
    
    try {
      const files = fs.readdirSync(AUDIT_LOG_DIR).filter(f => f.endsWith(".json"));
      return files.map(f => JSON.parse(fs.readFileSync(path.join(AUDIT_LOG_DIR, f), "utf-8")));
    } catch (error) {
      console.error("Failed to read audit logs:", error);
      return [];
    }
  }
}
