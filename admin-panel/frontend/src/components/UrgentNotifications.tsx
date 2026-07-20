"use client";

import { useUrgentMessages } from "../hooks/useDashboardApi";
import { Bell, Loader2, AlertCircle } from "lucide-react";

const channelIcons: Record<string, string> = {
  CORREO: "📧",
  SYSTEM: "⚙️",
  ALARM: "🔴",
};

export default function UrgentNotifications() {
  const { data, isLoading, error } = useUrgentMessages();

  return (
    <div className="bg-card border border-card-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Bell className="w-4 h-4 text-cyan-400" />
        Notificaciones Urgentes
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 py-4 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Error al cargar notificaciones</span>
        </div>
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">No hay notificaciones urgentes.</p>
      ) : (
        <div className="space-y-3">
          {data.map((msg) => (
            <div
              key={msg.messageId}
              className="flex items-start gap-3 bg-canvas-light border border-card-border rounded-lg p-3"
            >
              <span className="text-lg">{channelIcons[msg.sourceChannel] ?? "📌"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white truncate">{msg.title}</p>
                  <span className="text-xs text-red-500 font-semibold shrink-0">
                    {msg.sourceChannel}
                  </span>
                </div>
                {msg.body && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{msg.body}</p>
                )}
                {msg.receivedAt && (
                  <p className="text-xs text-slate-600 mt-1">
                    {new Date(msg.receivedAt).toLocaleTimeString("es-MX", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
              {!msg.isRead && (
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
