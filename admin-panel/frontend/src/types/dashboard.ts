export interface DailySummary {
  summaryId: number | null;
  summaryDate: string;
  keyActions: string[];
  events: string[];
  focusText: string;
}

export interface AgendaEvent {
  eventId: number;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  category: string | null;
}

export interface PriorityTask {
  taskId: number;
  title: string;
  progressPercentage: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate: string | null;
  priorityOrder: number;
}

export interface KeyProject {
  projectId: number;
  name: string;
  progressPercentage: number;
  status: string;
}

export interface KpiMetric {
  metricCode: string;
  metricName: string;
  displayValue: string;
  deltaPercentage: number;
  sparklineData: number[];
}

export interface UrgentMessage {
  messageId: number;
  sourceChannel: string;
  title: string;
  body: string | null;
  isRead: boolean;
  receivedAt: string;
}

export interface TeamActivity {
  activityId: number;
  teamName: string;
  description: string;
  activityType: string;
  loggedAt: string;
}
