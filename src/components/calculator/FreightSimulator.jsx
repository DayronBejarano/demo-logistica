import React from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export const FreightSimulator = ({ 
  t, 
  tipoServicio, 
  setTipoServicio, 
  tonelaje, 
  setTonelaje, 
  distanciaKm, 
  setDistanciaKm, 
  costoTotal, 
  galonesEst, 
  triggerSound, 
  handleWhatsAppRedirect 
}) => {
  return (
    <div className="space-y-8">
      <div className={`p-8 md:p-12 rounded-3xl ${t.bgCard} border ${t.border} shadow-2xl relative overflow-hidden backdrop-blur-xl`}>
        <div className={`flex justify-between items-center border-b ${t.border} pb-6 mb-8 font-mono`}>
          <div>
            <span className={`text-xs ${t.accent} uppercase tracking-widest block font-bold mb-1`}>
              Simulador Comercial Paramétrico
            </span>
            <h2 className="text-2xl md:text-4xl font-black">
              Calculador de Fletes & Cubicaje $m^3$
            </h2>
          </div>
          <Calculator className={`w-8 h-8 ${t.accent} hidden sm:block`} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center font-mono">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="block text-xs mb-2 uppercase font-bold">
                Categoría de Carga Requerida
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'seco', label: '📦 Carga Seca' },
                  { id: 'refrigerado', label: '❄️ Refrigerado' },
                  { id: 'hazmat', label: '⚠️ Hazmat' },
                  { id: 'pesado', label: '🏗️ Pesada' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { triggerSound(400); setTipoServicio(s.id); }}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                      tipoServicio === s.id ? `${t.btnPrimary} scale-105` : `${t.bgCardSubtle} ${t.border} ${t.textMuted}`
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className={t.textMuted}>Masa de Carga Solicitada:</span>
                <span className={`${t.accent} font-bold`}>{tonelaje} Toneladas</span>
              </div>
              <input
                type="range"
                min="5"
                max="34"
                value={tonelaje}
                onChange={(e) => setTonelaje(Number(e.target.value))}
                className="w-full h-2 bg-slate-400 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className={t.textMuted}>Distancia Estimada de Ruta:</span>
                <span className={`${t.accent} font-bold`}>{distanciaKm} km</span>
              </div>
              <input
                type="range"
                min="150"
                max="2200"
                step="50"
                value={distanciaKm}
                onChange={(e) => setDistanciaKm(Number(e.target.value))}
                className="w-full h-2 bg-slate-400 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className={`lg:col-span-5 ${t.bgCardSubtle} p-6 rounded-2xl border ${t.border} space-y-4`}>
            <div className={`pb-3 border-b ${t.border}`}>
              <span className={`text-[10px] ${t.textMuted} uppercase block`}>Tarifa Total Proyectada</span>
              <span className="text-3xl font-black">${costoTotal.toLocaleString()} USD</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className={t.textMuted}>Tiempo Estimado:</span>
                <span className="font-bold">~{Math.round(distanciaKm / 55)} Horas</span>
              </div>
              <div className="flex justify-between">
                <span className={t.textMuted}>Consumo ACPM:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{galonesEst} Galones</span>
              </div>
            </div>

            <button
              onClick={() => handleWhatsAppRedirect('Cotización-Simulada', `Servicio: ${tipoServicio} | Ton: ${tonelaje} | KM: ${distanciaKm} | Total: $${costoTotal}USD`)}
              className={`w-full ${t.btnPrimary} py-4 rounded-xl text-xs uppercase tracking-wider font-bold mt-4 flex items-center justify-center gap-2`}
            >
              <span>Generar Cotización Oficial PDF</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};