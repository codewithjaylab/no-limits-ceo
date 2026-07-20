import {
  BarChart3,
  Globe,
  Code2,
  Users,
  LineChart,
  Building2,
} from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Estrategia Digital",
    description:
      "Diagnóstico, hoja de ruta y OKRs para transformar tu negocio con tecnología.",
  },
  {
    icon: Globe,
    title: "Desarrollo Web & Móvil",
    description:
      "Productos digitales modernos con React, Next.js y Swift/Kotlin nativos.",
  },
  {
    icon: Code2,
    title: "Arquitectura Cloud",
    description:
      "Infraestructura escalable en AWS/GCP, microservicios y serverless.",
  },
  {
    icon: LineChart,
    title: "Data & Analytics",
    description:
      "Dashboards, KPIs en tiempo real y modelos predictivos para decisión informada.",
  },
  {
    icon: Users,
    title: "Consultoría Tech",
    description:
      "Acompañamiento técnico, code reviews y aceleración de equipos de ingeniería.",
  },
  {
    icon: Building2,
    title: "Transformación Organizacional",
    description:
      "Agilidad, OKRs y cultura de innovación para equipos de alto rendimiento.",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="py-24 bg-surface/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-brand-400 tracking-[0.2em] uppercase">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            Todo lo que necesitas para escalar
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Desde la estrategia hasta la ejecución, cubrimos cada etapa del
            ciclo de vida digital de tu empresa.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-surface-card border border-surface-border rounded-xl p-6 hover:border-brand-500/30 hover:glow transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                <service.icon size={20} className="text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
