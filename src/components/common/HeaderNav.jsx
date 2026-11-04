import React from 'react';
import { Truck, Gauge, Navigation, Calculator, Sparkles, Sun, Moon, Volume2, VolumeX, Calendar } from 'lucide-react';

export const HeaderNav = ({ 
  t, 
  modoKey, 
  setModoKey, 
  moduloActivo, 
  setModuloActivo, 
  sonidoHabilitado, 
  setSonidoHabilitado, 
  triggerSound, 
  setModalCita 
}) => {
  return (
    <nav className={`fixed w-full z-50 ${t.bgNav} backdrop-blur-2xl border-b ${t.border} px-6 py-4 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => { triggerSound(400); setModuloActivo('dashboard'); }}
        >
          <div className={`p-2.5 ${t.btnPrimary} rounded-xl shrink-0`}>
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block uppercase leading-none font-mono">
              LOGIX Enterprise<span className={t.accent}>.</span>
            </span>
            <span className={`text-[9px] font-mono ${t.textMuted} tracking-[0.22em] uppercase block mt-1`}>
              Telemetría Satelital & Control de Flotas
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 font-mono text-xs p-1.5 rounded-2xl bg-slate-900/30 border border-slate-700/50">
          {[
            { id: 'dashboard', label: 'Dashboard 3D', icon: Gauge },
            { id: 'tracking', label: 'Rastreador GPS', icon: Navigation },
            { id: 'cotizador', label: 'Simulador $m³', icon: Calculator },
            { id: 'custom', label: 'Módulos Custom', icon: Sparkles }
          ].map((tab) => {
            const IconComp = tab.icon;
            const active = moduloActivo === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { triggerSound(active ? 300 : 600); setModuloActivo(tab.id); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  active 
                    ? `${t.btnPrimary} scale-105` 
                    : `${t.textMuted} hover:text-slate-900 dark:hover:text-white`
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setModoKey(modoKey === 'claro' ? 'oscuro' : 'claro'); triggerSound(500); }}
            className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
              modoKey === 'claro' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-800 text-amber-300'
            }`}
            title="Switch Cromático Modo Gris Platino / Dark OLED"
          >
            {modoKey === 'claro' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => { setSonidoHabilitado(!sonidoHabilitado); triggerSound(700); }}
            className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
              modoKey === 'claro' ? 'bg-white border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {sonidoHabilitado ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button 
            onClick={() => { triggerSound(800); setModalCita(true); }}
            className={`${t.btnPrimary} text-xs px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 font-mono`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Cita CTO</span>
          </button>
        </div>
      </div>
    </nav>
  );
};