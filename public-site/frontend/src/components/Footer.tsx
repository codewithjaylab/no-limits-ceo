import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xs">
              NL
            </div>
            <span className="text-sm font-medium text-white">No Limits</span>
          </div>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            &copy; {new Date().getFullYear()} No Limits Company. Hecho con
            <Heart size={12} className="text-red-500" />
            desde México.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Twitter / X
            </a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
