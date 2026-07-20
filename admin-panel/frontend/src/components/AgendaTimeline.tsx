"use client";

import { useAgenda } from "../hooks/useDashboardApi";
import { Calendar, Loader2, AlertCircle } from "lucide-react";

const categoryColors: Record<string, string> = {
  STRATEGIC: "bg-purple-500",
  FINANCIAL: "bg-emerald-500",
  OPERATIONAL: "bg-blue-500",
};

export default function AgendaTimeline() {
  const { data, isLoading, error } = useAgenda();

  return (
    <div className="bg-card border border-card-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-cyan-400" />
        Agenda del Día
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 py-4 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Error al cargar agenda</span>
        </div>
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">No hay eventos programados para hoy.</p>
      ) : (
        <div className="space-y-3">
          {data.map((event) => {
            const start = new Date(event.startTime);
            const end = new Date(event.endTime);
            const timeStr = `${start.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}`;
            return (
              <div key={event.eventId} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${categoryColors[event.category ?? ""] ?? "bg-slate-500"}`} />
                  <div className="w-px flex-1 bg-slate-700 mt-1" />
                </div>
                <div className="pb-3 flex-1">
                  <p className="text-sm font-medium text-white">{event.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{timeStr}</p>
                  {event.description && (
                    <p className="text-xs text-slate-500 mt-1">{event.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
