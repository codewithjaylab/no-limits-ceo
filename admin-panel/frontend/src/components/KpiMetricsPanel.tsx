"use client";

import { useKpis } from "../hooks/useDashboardApi";
import {
  BarChart3,
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function KpiMetricsPanel() {
  const { data, isLoading, error } = useKpis();

  return (
    <div className="bg-card border border-card-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-cyan-400" />
        KPIs
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400 py-4 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Error al cargar KPIs</span>
        </div>
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">No hay KPIs disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((kpi) => {
            const isPositive = kpi.deltaPercentage >= 0;
            const chartData = kpi.sparklineData.map((val, i) => ({
              name: `p${i}`,
              value: val,
            }));

            return (
              <div
                key={kpi.metricCode}
                className="bg-canvas-light border border-card-border rounded-lg p-4"
              >
                <p className="text-xs text-slate-400 mb-1 truncate">
                  {kpi.metricName}
                </p>
                <p className="text-2xl font-bold text-white">{kpi.displayValue}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  {isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      isPositive ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {kpi.deltaPercentage}%
                  </span>
                </div>
                {chartData.length > 1 && (
                  <div className="mt-3 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1b2330",
                            border: "1px solid #242f42",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          labelStyle={{ color: "#94a3b8" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={isPositive ? "#10b981" : "#ef4444"}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
