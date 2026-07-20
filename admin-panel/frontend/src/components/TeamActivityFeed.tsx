"use client";

import { useTeamActivity } from "../hooks/useDashboardApi";
import { Activity, Loader2, AlertCircle } from "lucide-react";

const activityIcons: Record<string, string> = {
  DEPLOYMENT: "🚀",
  ACHIEVEMENT: "🏆",
  ALERT: "⚠️",
};

export default function TeamActivityFeed() {
  const { data, isLoading, error } = useTeamActivity();

  return (
    <div className="bg-card border border-card-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4 text-cyan-400" />
        Actividad del Equipo
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 py-4 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Error al cargar actividad</span>
        </div>
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">No hay actividad reciente.</p>
      ) : (
        <div className="space-y-3">
          {data.map((activity) => (
            <div key={activity.activityId} className="flex items-start gap-3">
              <span className="text-lg">{activityIcons[activity.activityType] ?? "📋"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-cyan-400">{activity.teamName}</p>
                  <span className="text-xs text-slate-600">{activity.activityType}</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{activity.description}</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {new Date(activity.loggedAt).toLocaleString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
