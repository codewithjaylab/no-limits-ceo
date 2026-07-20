import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/20 via-transparent to-surface pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
          <Zap size={14} className="text-brand-400" />
          <span className="text-xs font-medium text-brand-300 tracking-wide">
            Innovación y Tecnología
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6 animate-slide-up">
          Transformamos Ideas en{" "}
          <span className="text-gradient">Resultados</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-10 animate-slide-up">
          Somos una consultora de innovación y tecnología. Ayudamos a empresas
          a escalar con estrategia, datos y producto digital de clase mundial.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-medium px-8 py-3.5 rounded-xl transition-all glow"
          >
            Conversemos
            <ArrowRight size={18} />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 px-8 py-3.5 rounded-xl transition-all"
          >
            Ver Servicios
          </a>
        </div>

        {/* Trust Metrics */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-sm text-slate-500 mt-1">Proyectos Entregados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">98%</p>
            <p className="text-sm text-slate-500 mt-1">Satisfacción Cliente</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">4.9</p>
            <p className="text-sm text-slate-500 mt-1">Rating Promedio</p>
          </div>
        </div>
      </div>
    </section>
  );
}
