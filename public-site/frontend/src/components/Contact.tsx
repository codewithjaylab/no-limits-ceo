"use client";

import { useState } from "react";
import { Send, Mail, Check } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contacto" className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-surface-card to-surface border border-surface-border rounded-2xl p-8 md:p-12 glow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="text-xs font-semibold text-brand-400 tracking-[0.2em] uppercase">
                Contacto
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
                Hagamos algo grande juntos
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Cuéntanos sobre tu proyecto. Te respondemos en menos de 24
                horas.
              </p>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Mail size={16} className="text-brand-400" />
                hola@nolimitscompany.com
              </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  className="w-full bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Empresa"
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
              />
              <textarea
                placeholder="Cuéntanos de tu proyecto..."
                rows={4}
                required
                className="w-full bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-medium px-6 py-3 rounded-lg transition-all"
              >
                {sent ? (
                  <>
                    <Check size={18} /> Mensaje Enviado
                  </>
                ) : (
                  <>
                    <Send size={18} /> Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
