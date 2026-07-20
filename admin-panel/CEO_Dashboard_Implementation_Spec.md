# ARCHITECTURAL IMPLEMENTATION SPECIFICATION: CEO DASHBOARD (NO LIMITS COMPANY)
## SYSTEM SPEC-KIT FOR FULL-STACK DEPLOYMENT

This document serves as an absolute technical specification kit for an autonomous AI engineer (Claude Code / LLM) to construct the complete, dynamic end-to-end architecture of the **NO LIMITS COMPANY CEO Dashboard** based on visual requirements and standard corporate enterprise design patterns. All components must be dynamically driven via full-stack integration—no hardcoded layout stubs or static mockups are permitted.

---

### 1. SYSTEM ARCHITECTURE METADATA
*   **Target Persona:** Chief Executive Officer (CEO)
*   **Visual Source Reference:** `CEO DASHBOARD (Primera Página)`
*   **Frontend Stack:** React 18+, Next.js (App Router), Tailwind CSS, Lucide React (Icons), Recharts (Framer/Canvas rendering for KPIs)
*   **Backend Stack:** Java 17, Spring Boot 3.x, Spring Data JPA, Spring Security (JWT-based RBAC)
*   **Database Engine:** PostgreSQL 15+ (Relational Open-Source)
*   **Data Flow:** Restful Web API / JSON payloads with real-time SSE (Server-Sent Events) or WebSocket endpoints for transactional push updates.

---

### 2. DATABASE SCHEMA ARCHITECTURE (POSTGRESQL)

The database layers must explicitly support relational constraints, audit trails, and multi-tenant scoping where applicable. Generate Liquibase/Flyway migrations or raw DDL following this structure:

```sql
-- 1. USER PROFILE AND AUTH SCOPE
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CEO',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. DAILY SUMMARY AND FOCUS
CREATE TABLE daily_summaries (
    summary_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    summary_date DATE NOT NULL DEFAULT CURRENT_DATE,
    key_actions TEXT[] NOT NULL,
    events TEXT[] NOT NULL,
    focus_text TEXT NOT NULL,
    CONSTRAINT unique_user_date UNIQUE(user_id, summary_date)
);

-- 3. AGENDA / SCHEDULE
CREATE TABLE agenda_events (
    event_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    category VARCHAR(50), -- STRATEGIC, FINANCIAL, OPERATIONAL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PRIORITIZED TASKS
CREATE TABLE priority_tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(200) NOT NULL,
    progress_percentage INT CHECK (progress_percentage BETWEEN 0 AND 100) DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED
    due_date DATE,
    priority_order INT NOT NULL
);

-- 5. KEY PROJECTS
CREATE TABLE key_projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    progress_percentage INT CHECK (progress_percentage BETWEEN 0 AND 100) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'IN_PROGRESS',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. KEY PERFORMANCE INDICATORS (KPIs) WITH HISTORICAL SERIES
CREATE TABLE kpi_metrics (
    kpi_id SERIAL PRIMARY KEY,
    metric_code VARCHAR(50) UNIQUE NOT NULL, -- MONTHLY_REVENUE, SALES_GROWTH, OPERATIONAL_MARGIN
    metric_name VARCHAR(100) NOT NULL,
    current_value NUMERIC(15,2) NOT NULL,
    display_format VARCHAR(20) NOT NULL, -- CURRENCY, PERCENTAGE, NUMBER
    delta_percentage NUMERIC(5,2) NOT NULL, -- e.g., +8.00, -2.50
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kpi_historical_data (
    history_id SERIAL PRIMARY KEY,
    kpi_id INT REFERENCES kpi_metrics(kpi_id) ON DELETE CASCADE,
    datapoint_value NUMERIC(15,2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 7. NOTIFICATIONS / URGENT MESSAGES
CREATE TABLE urgent_messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    source_channel VARCHAR(50) NOT NULL, -- CORREO, SYSTEM, ALARM
    title VARCHAR(250) NOT NULL,
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. TEAM RECENT ACTIVITY
CREATE TABLE team_activities (
    activity_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- ACHIEVEMENT, DEPLOYMENT, ALERT
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3. BACKEND SERVICE ARCHITECTURE (SPRING BOOT 3.X / JAVA 17)

Implement robust, idiomatic Java components utilizing Spring Web, Spring Data JPA, and Lombok for boilerplate encapsulation.

#### A. Domain DTO Examples
Ensure clean JSON contracts for data exposure:
```java
package com.nolimits.dashboard.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class KpiDashboardDTO {
    private String metricCode;
    private String metricName;
    private String displayValue;
    private BigDecimal deltaPercentage;
    private List<BigDecimal> sparklineData;
}
```

#### B. Rest Controller Tier
Expose clean, semantic endpoints returning unified response wrappers.
```java
package com.nolimits.dashboard.controller;

import com.nolimits.dashboard.dto.*;
import com.nolimits.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Configure properly for production CORS strategies
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DailySummaryDTO> getDailySummary(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchSummaryByDate(userId, LocalDate.now()));
    }

    @GetMapping("/agenda")
    public ResponseEntity<List<AgendaEventDTO>> getTodayAgenda(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchTodayEvents(userId));
    }

    @GetMapping("/tasks/priority")
    public ResponseEntity<List<PriorityTaskDTO>> getPriorityTasks(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchTopPriorityTasks(userId));
    }

    @GetMapping("/projects/key")
    public ResponseEntity<List<KeyProjectDTO>> getKeyProjects() {
        return ResponseEntity.ok(dashboardService.fetchActiveKeyProjects());
    }

    @GetMapping("/kpis")
    public ResponseEntity<List<KpiDashboardDTO>> getKpiMetrics() {
        return ResponseEntity.ok(dashboardService.calculateLiveKpis());
    }
    
    @GetMapping("/notifications/urgent")
    public ResponseEntity<List<UrgentMessageDTO>> getUrgentMessages(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchUnreadUrgentMessages(userId));
    }
}
```

---

### 4. FRONTEND UX/UI IMPLEMENTATION (NEXT.JS / REACT)

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

### 5. EXECUTION & DELIVERY REQUIRMENTS FOR CLAUDE

When processing this document, ensure that the following runtime conditions are fully integrated:
1.  **State Revalidation:** Use React Context, Redux Toolkit, or React Query (`useQuery`) to pool backend endpoints dynamically. Use 30-second polling windows or real-time event updates to prevent interface stagnation.
2.  **Graceful Degradation & Loading States:** Render localized Skeleton components tailored to match card aspect ratios while JSON parameters parse.
3.  **Error Handling Scaffolding:** Wrap functional UI partitions inside standard Error Boundaries to isolate database connection timeout failures or serialization anomalies safely.
4.  **No Mock Fallbacks:** Build complete JPA Repository definitions linking target tables to operational services so data mutation cycles immediately update the front-end layout metrics.
