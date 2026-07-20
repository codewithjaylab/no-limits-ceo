import { Target, Eye, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Empoderar a empresas con tecnología de clase mundial y estrategia data-driven para que alcancen su máximo potencial.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Ser el socio tecnológico de referencia en Latinoamérica para compañías que buscan innovar y escalar sin límites.",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Excelencia sin excusas, transparencia radical, obsesión por el cliente y mejora continua en cada línea de código.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-brand-400 tracking-[0.2em] uppercase">
            Nosotros
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            Hecho por ingenieros, para empresas
          </h2>
          <p className="text-slate-400 leading-relaxed">
            No Limits Company nace de la experiencia de liderar equipos de
            producto y tecnología en startups y corporaciones globales.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item) => (
            <div
              key={item.title}
              className="text-center p-8 rounded-xl bg-surface-card border border-surface-border"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto mb-5">
                <item.icon size={24} className="text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team preview */}
        <div className="mt-16 bg-surface-card border border-surface-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex -space-x-3 shrink-0">
            {["AR", "JM", "LC", "PG"].map((initials) => (
              <div
                key={initials}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-surface flex items-center justify-center text-xs font-bold text-white"
              >
                {initials}
              </div>
            ))}
          </div>
          <div>
            <p className="text-white font-semibold text-lg mb-1">
              Equipo Senior
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ex-ingenieros de FAANG y startups unicornio. Promedio de 10+ años
              de experiencia en producto, datos e infraestructura.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
