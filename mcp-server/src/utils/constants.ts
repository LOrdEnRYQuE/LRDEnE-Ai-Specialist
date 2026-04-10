import * as path from "path";

/**
 * Global Constants for the LRDEnE Specialist Agents Kit
 */

// Kit root is the absolute path to this directory
export const KIT_ROOT = "/Users/leads/dev/AI-Specialists ";

// Standardized centralized log path for all audits
export const AUDIT_LOG_DIR = path.join(KIT_ROOT, ".lrdene", "logs", "audits");

// Standard file scan limits
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const MAX_TOTAL_SCAN_BYTES = 100 * 1024 * 1024; // 100MB
