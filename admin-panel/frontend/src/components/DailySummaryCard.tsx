"use client";

import { useDailySummary } from "../hooks/useDashboardApi";
import { FileText, Loader2, AlertCircle } from "lucide-react";

export default function DailySummaryCard() {
  const { data, isLoading, error } = useDailySummary();

  if (isLoading) {
    return (
      <CardShell title="Resumen del Día">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      </CardShell>
    );
  }

  if (error || !data) {
    return (
      <CardShell title="Resumen del Día">
        <div className="flex items-center gap-2 text-red-400 py-4 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Error al cargar resumen</span>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell title="Resumen del Día">
      <p className="text-xs text-slate-500 mb-3">{data.summaryDate}</p>
      <p className="text-sm text-slate-200 leading-relaxed mb-4">{data.focusText}</p>
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          Acciones Clave
        </h4>
        <ul className="space-y-1">
          {data.keyActions.map((action, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
              {action}
            </li>
          ))}
        </ul>
      </div>
      {data.events.length > 0 && (
        <div className="mt-3 space-y-2">
          <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Eventos
          </h4>
          <ul className="space-y-1">
            {data.events.map((evt, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                {evt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardShell>
  );
}

function CardShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-cyan-400" />
        {title}
      </h3>
      {children}
    </div>
  );
}
