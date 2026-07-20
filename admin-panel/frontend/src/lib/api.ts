const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/dashboard";

import type {
  DailySummary,
  AgendaEvent,
  PriorityTask,
  KeyProject,
  KpiMetric,
  UrgentMessage,
  TeamActivity,
} from "../types/dashboard";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  getSummary: (userId: number) =>
    fetchJson<DailySummary>(`${API_BASE}/summary?userId=${userId}`),
  getAgenda: (userId: number) =>
    fetchJson<AgendaEvent[]>(`${API_BASE}/agenda?userId=${userId}`),
  getPriorityTasks: (userId: number) =>
    fetchJson<PriorityTask[]>(`${API_BASE}/tasks/priority?userId=${userId}`),
  getKeyProjects: () =>
    fetchJson<KeyProject[]>(`${API_BASE}/projects/key`),
  getKpis: () =>
    fetchJson<KpiMetric[]>(`${API_BASE}/kpis`),
  getUrgentMessages: (userId: number) =>
    fetchJson<UrgentMessage[]>(`${API_BASE}/notifications/urgent?userId=${userId}`),
  getActivity: () =>
    fetchJson<TeamActivity[]>(`${API_BASE}/activity`),
};
