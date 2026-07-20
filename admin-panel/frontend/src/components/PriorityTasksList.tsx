"use client";

import { usePriorityTasks } from "../hooks/useDashboardApi";
import { CheckSquare, Loader2, AlertCircle } from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500",
  IN_PROGRESS: "bg-blue-500",
  COMPLETED: "bg-emerald-500",
};

export default function PriorityTasksList() {
  const { data, isLoading, error } = usePriorityTasks();

  return (
    <div className="bg-card border border-card-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <CheckSquare className="w-4 h-4 text-cyan-400" />
        Tareas Prioritarias
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 py-4 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Error al cargar tareas</span>
        </div>
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">No hay tareas pendientes.</p>
      ) : (
        <div className="space-y-3">
          {data.map((task) => (
            <div key={task.taskId} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${statusColors[task.status] ?? "bg-slate-500"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm text-slate-200 truncate">{task.title}</p>
                  <span className="text-xs text-slate-500 shrink-0">
                    {task.progressPercentage}%
                  </span>
                </div>
                <div className="mt-1.5 w-full bg-slate-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                    style={{ width: `${task.progressPercentage}%` }}
                  />
                </div>
                {task.dueDate && (
                  <p className="text-xs text-slate-500 mt-1">Vence: {task.dueDate}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
