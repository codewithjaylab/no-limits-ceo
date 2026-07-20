"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

const USER_ID = 1;

export function useDailySummary() {
  return useQuery({
    queryKey: ["daily-summary", USER_ID],
    queryFn: () => api.getSummary(USER_ID),
    refetchInterval: 30_000,
  });
}

export function useAgenda() {
  return useQuery({
    queryKey: ["agenda", USER_ID],
    queryFn: () => api.getAgenda(USER_ID),
    refetchInterval: 30_000,
  });
}

export function usePriorityTasks() {
  return useQuery({
    queryKey: ["priority-tasks", USER_ID],
    queryFn: () => api.getPriorityTasks(USER_ID),
    refetchInterval: 30_000,
  });
}

export function useKeyProjects() {
  return useQuery({
    queryKey: ["key-projects"],
    queryFn: () => api.getKeyProjects(),
    refetchInterval: 30_000,
  });
}

export function useKpis() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: () => api.getKpis(),
    refetchInterval: 30_000,
  });
}

export function useUrgentMessages() {
  return useQuery({
    queryKey: ["urgent-messages", USER_ID],
    queryFn: () => api.getUrgentMessages(USER_ID),
    refetchInterval: 30_000,
  });
}

export function useTeamActivity() {
  return useQuery({
    queryKey: ["team-activity"],
    queryFn: () => api.getActivity(),
    refetchInterval: 30_000,
  });
}
