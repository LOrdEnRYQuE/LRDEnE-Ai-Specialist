import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "LRDEnE Control Center",
  description: "Premium Specialist Agent Command Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <div className="flex h-screen bg-[#050505] text-white">
          {/* Sidebar */}
          <aside className="w-64 border-r border-white/10 bg-black p-6 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">L</div>
              <span className="font-outfit font-bold text-xl tracking-tight">LRDEnE</span>
            </Link>

            <nav className="flex flex-col gap-2">
              <Link href="/" className="nav-item">Dashboard</Link>
              <div className="nav-item opacity-50 cursor-not-allowed">Agents</div>
              <div className="nav-item opacity-50 cursor-not-allowed">Toolbox</div>
              <Link href="/audits" className="nav-item">Audits</Link>
              <div className="nav-item opacity-50 cursor-not-allowed">Settings</div>
            </nav>

            <div className="mt-auto p-4 glass-card text-xs text-neutral-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>MCP Server Live</span>
              </div>
              <div>v2.2.0 (Security Pack)</div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-8 relative">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
