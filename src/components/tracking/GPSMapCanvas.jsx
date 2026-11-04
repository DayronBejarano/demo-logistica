import React from 'react';
import { Navigation, Truck, Download } from 'lucide-react';

export const GPSMapCanvas = ({ t, modoKey, unidadActiva, FLOTA_COMPLETA, setUnidadActiva, triggerSound, handleWhatsAppRedirect }) => {
  return (
    <div className="space-y-8">
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b ${t.border} font-mono`}>
        <div>
          <span className={`text-xs ${t.accent} uppercase font-bold tracking-widest block`}>Telemetría Georreferenciada</span>
          <h2 className="text-3xl font-black mt-1">Monitoreo de Carretera en Tiempo Real</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {FLOTA_COMPLETA.map((u) => (
            <button
              key={u.id}
              onClick={() => { triggerSound(500); setUnidadActiva(u); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                unidadActiva.id === u.id 
                  ? `${t.btnPrimary} scale-105` 
                  : `${t.bgCard} ${t.border} ${t.textMuted}`
              }`}
            >
              📍 {u.id} ({u.origen.split(' ')[0]} ➔ {u.destino.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <div className={`lg:col-span-8 ${t.bgCard} p-6 rounded-3xl border ${t.border} shadow-2xl relative min-h-[420px] flex flex-col justify-between`}>
          <div className={`flex items-center justify-between border-b ${t.border} pb-4 mb-4 font-mono`}>
            <div className="flex items-center gap-2">
              <Navigation className={`w-5 h-5 ${t.accent} animate-bounce`} />
              <span className="text-xs font-bold uppercase">Unidad: {unidadActiva.id} — {unidadActiva.unidad}</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800 font-bold">
              GPS SATELLITE OK
            </span>
          </div>

          <div 
            className="relative my-auto aspect-[16/9] w-full rounded-2xl border p-4 flex items-center justify-center overflow-hidden transition-colors duration-500 shadow-inner"
            style={{ backgroundColor: t.mapBg, borderColor: modoKey === 'claro' ? '#cbd5e1' : '#1e293b' }}
          >
            <svg className="w-full h-full max-h-[290px]" viewBox="0 0 700 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 50 H 700 M 0 100 H 700 M 0 150 H 700 M 0 200 H 700 M 0 250 H 700 M 0 300 H 700" stroke={t.mapGrid} strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 100 0 V 320 M 200 0 V 320 M 300 0 V 320 M 400 0 V 320 M 500 0 V 320 M 600 0 V 320" stroke={t.mapGrid} strokeWidth="1" strokeDasharray="4 4" />

              <path d="M 100 250 Q 260 120, 460 160 T 600 80" stroke={t.mapGrid} strokeWidth="6" strokeLinecap="round" />
              <path d="M 100 250 Q 260 120, 460 160 T 600 80" stroke={t.mapRoute} strokeWidth="3" strokeDasharray="12 8" strokeLinecap="round" className="animate-pulse" />

              <circle cx="100" cy="250" r="10" fill={t.mapBg} stroke={t.mapRoute} strokeWidth="3" />
              <text x="65" y="285" fill={t.mapText} fontSize="11" fontFamily="monospace" fontWeight="bold">Origen: {unidadActiva.origen.split(' ')[0]}</text>

              <g transform="translate(425, 142)">
                <circle cx="0" cy="0" r="24" fill={t.mapGlow} className="animate-ping" />
                <circle cx="0" cy="0" r="14" fill={t.mapRoute} />
                <Truck className="w-5 h-5 text-white -translate-x-2.5 -translate-y-2.5" />
              </g>

              <circle cx="600" cy="80" r="10" fill={t.mapBg} stroke="#059669" strokeWidth="3" />
              <text x="545" y="60" fill={modoKey === 'claro' ? '#047857' : '#10b981'} fontSize="11" fontFamily="monospace" fontWeight="bold">Destino: {unidadActiva.destino.split(' ')[0]}</text>
            </svg>
          </div>

          <div className={`space-y-2 pt-4 border-t ${t.border} font-mono`}>
            <div className="flex justify-between text-xs">
              <span className={t.textMuted}>Progreso Recorrido ({unidadActiva.distancia}):</span>
              <span className={`${t.accent} font-bold`}>{unidadActiva.progreso}% Completado</span>
            </div>
            <div className={`w-full h-2.5 ${t.bgCardSubtle} rounded-full overflow-hidden border ${t.border}`}>
              <div className={`h-full ${t.btnPrimary} transition-all duration-700`} style={{ width: `${unidadActiva.progreso}%` }} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4 font-mono text-xs">
          <div className={`p-6 rounded-3xl ${t.bgCard} border ${t.border} space-y-4 shadow-xl`}>
            <div className={`flex justify-between items-center pb-3 border-b ${t.border}`}>
              <h4 className="text-sm font-bold uppercase">Parámetros de Unidad</h4>
              <span className={`text-[10px] ${t.textMuted}`}>{unidadActiva.lat}</span>
            </div>

            <div className={`p-3.5 rounded-xl ${t.bgCardSubtle} border ${t.border} space-y-1`}>
              <span className={`${t.textMuted} text-[10px] uppercase block`}>Conductor Asignado</span>
              <span className="font-bold text-sm block">{unidadActiva.conductor}</span>
            </div>

            <div className={`p-3.5 rounded-xl ${t.bgCardSubtle} border ${t.border} space-y-1`}>
              <span className={`${t.textMuted} text-[10px] uppercase block`}>Manifiesto de Carga</span>
              <span className="font-bold block">{unidadActiva.tipoCarga}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className={`p-3 rounded-xl ${t.bgCardSubtle} border ${t.border}`}>
                <span className={`${t.textMuted} text-[10px] uppercase block`}>Thermo-King</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{unidadActiva.temperatura}</span>
              </div>
              <div className={`p-3 rounded-xl ${t.bgCardSubtle} border ${t.border}`}>
                <span className={`${t.textMuted} text-[10px] uppercase block`}>Tanque ACPM</span>
                <span className={`font-bold ${t.accent} block`}>{unidadActiva.combustible}</span>
              </div>
            </div>

            <button
              onClick={() => handleWhatsAppRedirect('Reporte-GPS-Descarga', `Unidad: ${unidadActiva.id}`)}
              className={`w-full ${t.btnPrimary} py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2`}
            >
              <Download className="w-4 h-4" />
              <span>Descargar Reporte PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};