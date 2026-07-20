# ARCHITECTURAL IMPLEMENTATION SPECIFICATION: CEO DASHBOARD (NO LIMITS COMPANY) - FRONTEND & GENERAL ARCHITECTURE
## SYSTEM SPEC-KIT FOR FULL-STACK DEPLOYMENT (PART 1)

This document serves as the frontend and general architectural specification kit for building the complete, dynamic end-to-end architecture of the **NO LIMITS COMPANY CEO Dashboard**.

---

### 1. SYSTEM ARCHITECTURE METADATA
*   **Target Persona:** Chief Executive Officer (CEO)
*   **Visual Source Reference:** `CEO DASHBOARD (Primera Página)`
*   **Frontend Stack:** React 18+, Next.js (App Router), Tailwind CSS, Lucide React (Icons), Recharts (Framer/Canvas rendering for KPIs)
*   **Backend Stack:** Java 17, Spring Boot 3.x, Spring Data JPA, Spring Security (JWT-based RBAC)
*   **Database Engine:** PostgreSQL 15+ (Relational Open-Source)
*   **Data Flow:** Restful Web API / JSON payloads with real-time SSE (Server-Sent Events) or WebSocket endpoints for transactional push updates.

---

### 2. FRONTEND UX/UI IMPLEMENTATION (NEXT.JS / REACT)

#### A. Design System Tokens (Tailwind Config Injection)
The UI must strictly mirror the dark, precise executive aesthetic displayed in the mock reference document.
*   **Background Canvas:** Deep Slate Carbon (`#0f1319` to `#131922`)
*   **Card Containers:** Elevated Dark Indigo-Grey (`#1b2330` with high-definition desaturated borders `#242f42`)
*   **Primary Active Elements/Text Highlighting:** Bright ice blue / high contrast clean white (`#ffffff`, `#e2e8f0`)
*   **Accent Data Drivers:**
    *   Progress Tracks: Aqua Cyan / Teal gradient (`#06b6d4` to `#3b82f6`)
    *   Alert Low/Negative: Salmon Red Crimson (`#ef4444`)
    *   Delta Positive Indicator: Emerald Mint (`#10b981`)

#### B. Core Dashboard Component Matrix
The frontend orchestration grid must consist of independent functional component layers. Do not couple state hooks globally where isolated refetching is appropriate.

```tsx
// components/DashboardGrid.tsx
import React from 'react';
import DailySummaryCard from './DailySummaryCard';
import AgendaTimeline from './AgendaTimeline';
import PriorityTasksList from './PriorityTasksList';
import KeyProjectsTracker from './KeyProjectsTracker';
import KpiMetricsPanel from './KpiMetricsPanel';
import UrgentNotifications from './UrgentNotifications';
import TeamActivityFeed from './TeamActivityFeed';

export default function DashboardGrid({ userId }: { userId: number }) {
  return (
    <div className="min-h-screen bg-[#0f1319] text-slate-100 p-6 font-sans">
      {/* GLOBAL HEADER BAR */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">CEO DASHBOARD</h1>
          <p className="text-xs text-slate-400 mt-1">
            {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-6 w-full md:w-auto justify-end">
          <div className="relative max-w-xs w-full">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-[#1b2330] border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-white transition-colors relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              {/* Message Icon */}
            </button>
            <button className="hover:text-white transition-colors">
              {/* Settings Icon */}
            </button>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">Alex R.</p>
              <p className="text-xs text-slate-500">CEO</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-cyan-500 overflow-hidden">
              {/* User profile image */}
            </div>
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN PANEL FLUID GRID (SPAN 5) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <DailySummaryCard userId={userId} />
          <AgendaTimeline userId={userId} />
          <PriorityTasksList userId={userId} />
        </div>

        {/* RIGHT COLUMN PANEL FLUID GRID (SPAN 7) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          <KeyProjectsTracker />
          <KpiMetricsPanel />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UrgentNotifications userId={userId} />
            <TeamActivityFeed />
          </div>
        </div>

      </div>
    </div>
  );
}
```

---

### 3. EXECUTION & DELIVERY REQUIRMENTS FOR FRONTEND
1.  **State Revalidation:** Use React Context, Redux Toolkit, or React Query (`useQuery`) to pool backend endpoints dynamically. Use 30-second polling windows or real-time event updates to prevent interface stagnation.
2.  **Graceful Degradation & Loading States:** Render localized Skeleton components tailored to match card aspect ratios while JSON parameters parse.
3.  **Error Handling Scaffolding:** Wrap functional UI partitions inside standard Error Boundaries to isolate database connection timeout failures or serialization anomalies safely.