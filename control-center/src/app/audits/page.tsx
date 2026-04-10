"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, History, ExternalLink, Filter, Search } from "lucide-react";

const MOCK_LOGS = [
  {
    id: "uuid-1",
    projectName: "LRDEnE Kit",
    agent: "Security Hardening Auditor",
    date: "2026-04-10 13:20",
    severity: "CRITICAL",
    findings: 8,
    status: "Completed"
  },
  {
    id: "uuid-2",
    projectName: "StringArtGenerator",
    agent: "SEO Growth Auditor",
    date: "2026-04-09 10:15",
    severity: "MEDIUM",
    findings: 3,
    status: "Completed"
  },
  {
    id: "uuid-3",
    projectName: "Autohaus Royal",
    agent: "GDPR Compliance Copilot",
    date: "2026-04-08 15:45",
    severity: "LOW",
    findings: 1,
    status: "Archive"
  }
];

export default function AuditsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-outfit font-bold tracking-tight">Live Audit Logs</h1>
          <p className="text-neutral-400">Centralized history of all specialist scans and findings.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-medium">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            Export All
          </button>
        </div>
      </header>

      {/* Logs Table */}
      <section className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/[0.02]">
           <div className="flex-1 relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
             <input 
               type="text" 
               placeholder="Search audits by project or agent..." 
               className="w-full bg-black/40 border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
             />
           </div>
           <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <History className="w-3 h-3" />
              <span>TOTAL AUDITS: 124</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-outfit font-bold text-neutral-500 border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-4 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 uppercase tracking-wider">Specialist</th>
                <th className="px-6 py-4 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 uppercase tracking-wider">Findings</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {MOCK_LOGS.map((log, i) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-white group-hover:text-indigo-400 transition-colors uppercase text-sm tracking-tight">{log.projectName}</div>
                    <div className="text-[10px] text-neutral-500 font-mono">ID: {log.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-300">{log.agent}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-400">{log.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      log.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      log.severity === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <ShieldAlert className={`w-4 h-4 ${log.findings > 5 ? 'text-red-500' : 'text-neutral-500'}`} />
                       <span className="text-sm font-bold">{log.findings} issues</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded hover:bg-white/10 text-neutral-500 hover:text-white transition-all">
                       <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Persistence Note */}
      <footer className="p-6 glass-card bg-indigo-500/5 flex items-center gap-4 border-indigo-500/10">
         <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-sm">Centralized History Enabled (v4.0)</h4>
            <p className="text-xs text-neutral-400">All audit JSON files are stored in <code>.lrdene/logs/audits/</code>. These logs are global across all projects serviced by this kit.</p>
         </div>
         <button className="text-xs font-bold text-indigo-400 hover:underline">Clear History</button>
      </footer>
    </div>
  );
}
