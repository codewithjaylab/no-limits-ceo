"use client";

import DailySummaryCard from "./DailySummaryCard";
import AgendaTimeline from "./AgendaTimeline";
import PriorityTasksList from "./PriorityTasksList";
import KeyProjectsTracker from "./KeyProjectsTracker";
import KpiMetricsPanel from "./KpiMetricsPanel";
import UrgentNotifications from "./UrgentNotifications";
import TeamActivityFeed from "./TeamActivityFeed";

export default function DashboardGrid() {
  return (
    <div className="min-h-screen bg-canvas text-slate-100 p-6 font-sans">
      {/* Global Header Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            CEO DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {new Date().toLocaleDateString("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-6 w-full md:w-auto justify-end">
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-card border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-white transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">Alex R.</p>
              <p className="text-xs text-slate-500">CEO</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-cyan-500 overflow-hidden flex items-center justify-center text-sm font-bold text-white">
              AR
            </div>
          </div>
        </div>
      </header>

      {/* Core Framework Workspace Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (Span 5) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <DailySummaryCard />
          <AgendaTimeline />
          <PriorityTasksList />
        </div>

        {/* Right Column (Span 7) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          <KeyProjectsTracker />
          <KpiMetricsPanel />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UrgentNotifications />
            <TeamActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
