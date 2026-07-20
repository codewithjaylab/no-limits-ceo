"use client";

import { useKeyProjects } from "../hooks/useDashboardApi";
import { Briefcase, Loader2, AlertCircle } from "lucide-react";

export default function KeyProjectsTracker() {
  const { data, isLoading, error } = useKeyProjects();

  return (
    <div className="bg-card border border-card-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-cyan-400" />
        Proyectos Clave
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 py-4 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Error al cargar proyectos</span>
        </div>
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">No hay proyectos activos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((project) => (
            <div key={project.projectId} className="bg-canvas-light border border-card-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-white truncate">{project.name}</p>
                <span className="text-xs font-semibold text-cyan-400 shrink-0 ml-2">
                  {project.progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                  style={{ width: `${project.progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">{project.status.replace("_", " ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
