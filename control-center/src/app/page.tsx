"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Search, Cpu, Layers, ExternalLink } from "lucide-react";

const STATS = [
  { label: "Agents Active", value: "3", icon: Cpu, color: "text-indigo-400" },
  { label: "Audit Confidence", value: "98%", icon: ShieldCheck, color: "text-green-400" },
  { label: "Live Tools", value: "10", icon: Activity, color: "text-blue-400" },
];

const AGENTS = [
  {
    name: "WebApp Architect",
    desc: "Scaffolding, architecture & E2E builds.",
    status: "Online",
    tools: ["architecture_plan", "scaffold_feature", "repo_scan"],
    color: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    name: "SEO Growth Auditor",
    desc: "Technical audits & schema optimization.",
    status: "Idle",
    tools: ["crawl_site", "seo_audit", "schema_markup"],
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "GDPR Compliance Copilot",
    desc: "Multi-region privacy & risk mapping.",
    status: "Monitoring",
    tools: ["gdpr_gap_report", "data_flow_map", "dsar_pack"],
    color: "from-emerald-500/20 to-emerald-500/5",
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-outfit font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent"
        >
          Control Center
        </motion.h1>
        <p className="text-neutral-400 text-lg">Manage your LRDEnE Specialist Agents and view system telemetry.</p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center justify-between glow-border"
          >
            <div>
              <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 font-outfit">{stat.value}</h3>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
          </motion.div>
        ))}
      </section>

      {/* Agents Hub */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-outfit flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-500" />
            Specialist Agents
          </h2>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View All Specialists</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`glass-card p-6 space-y-4 border-l-4 border-l-indigo-500/30 group`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold font-outfit leading-tight">{agent.name}</h3>
                <span className="px-2 py-1 rounded-full bg-indigo-500/10 text-[10px] font-bold uppercase tracking-wider text-indigo-400 border border-indigo-500/20">
                  {agent.status}
                </span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed">{agent.desc}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-2">
                {agent.tools.map(tool => (
                  <code key={tool} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
                    {tool}()
                  </code>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 border border-black" />
                  <div className="w-6 h-6 rounded-full bg-neutral-700 border border-black" />
                  <div className="w-6 h-6 rounded-full bg-neutral-600 border border-black" />
                </div>
                <button className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all">
                   <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Audit */}
      <section className="glass-card p-8 glow-border overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-3xl font-bold font-outfit">Run Rapid Audit</h2>
            <p className="text-neutral-400">Trigger a full system sweep using the SEO Auditor and GDPR Copilot. Get a combined compliance score in seconds.</p>
            <div className="flex items-center gap-4">
               <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">Start Audit</button>
               <button className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 font-bold transition-all">Select Targets</button>
            </div>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-sm glass-card bg-black/40 p-6 space-y-3 font-mono text-xs text-neutral-500 border-white/5">
             <div className="flex justify-between text-indigo-400"><span className="flex items-center gap-2"><Activity className="w-3 h-3"/>Initializing...</span><span>100%</span></div>
             <div className="flex justify-between"><span>fetching @specialist-mcp-server</span><span className="text-green-500">DONE</span></div>
             <div className="flex justify-between"><span>running repo_scan (path: ./)</span><span className="text-green-500">DONE</span></div>
             <div className="flex justify-between"><span>found Next.js, Tailwind, glob</span><span className="text-neutral-300">INFO</span></div>
             <div className="animate-pulse flex gap-1"><span>$</span><div className="w-1 h-3 bg-indigo-500"/></div>
          </div>
        </div>
      </section>
    </div>
  );
}
