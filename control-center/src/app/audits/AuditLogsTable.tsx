"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ExternalLink, Search } from "lucide-react";
import React, { useState } from "react";
import { AuditLogEntry } from "../../../../mcp-server/src/utils/logger";

export default function AuditLogsTable({ initialLogs }: { initialLogs: AuditLogEntry[] }) {
  const [search, setSearch] = useState("");
  
  const filteredLogs = initialLogs.filter(log => 
    log.projectName.toLowerCase().includes(search.toLowerCase()) || 
    log.agentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="glass-card overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/[0.02]">
         <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
           <input 
             type="text" 
             value={search}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
             placeholder="Search audits by project or agent..." 
             className="w-full bg-black/40 border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
           />
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-outfit font-bold text-neutral-500 border-b border-white/5 bg-white/[0.01]">
              <th className="px-6 py-4 uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 uppercase tracking-wider">Specialist</th>
              <th className="px-6 py-4 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 uppercase tracking-wider">Severity Summary</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {filteredLogs.map((log: AuditLogEntry, i: number) => (
              <motion.tr 
                key={log.auditId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-bold text-white group-hover:text-indigo-400 transition-colors uppercase text-sm tracking-tight">{log.projectName}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">v{log.schemaVersion} • {log.auditId.substring(0,8)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-neutral-300">{log.agentId}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-neutral-400">{new Date(log.timestamp).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-1 text-[10px] font-bold">
                        <span className="text-red-500">C:{log.severitySummary.critical}</span>
                        <span className="text-amber-500">H:{log.severitySummary.high}</span>
                        <span className="text-blue-500">M:{log.severitySummary.medium}</span>
                     </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded hover:bg-white/10 text-neutral-500 hover:text-white transition-all">
                     <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
            {filteredLogs.length === 0 && (
               <tr><td colSpan={5} className="p-12 text-center text-neutral-500 italic">No audits found. Run a scan to begin.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
