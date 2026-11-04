import React, { useState } from 'react';
import { PALETAS_SISTEMA } from './constants/theme';
import { FLOTA_COMPLETA } from './data/fleetData';
import { playUISound } from './utils/sound';

import { ParticleBackground } from './components/common/ParticleBackground';
import { TiltCard } from './components/common/TiltCard';
import { HeaderNav } from './components/common/HeaderNav';
import { LiveTelemetryChart } from './components/dashboard/LiveTelemetryChart';
import { GPSMapCanvas } from './components/tracking/GPSMapCanvas';
import { FreightSimulator } from './components/calculator/FreightSimulator';
import { CustomModuleBuilder } from './components/custom/CustomModuleBuilder';
import { LeadCaptureModal } from './components/modals/LeadCaptureModal';

import { 
  Radio, Sparkles, ChevronRight, Calendar, Navigation, 
  Gauge, Cpu, Truck 
} from 'lucide-react';

export const App = () => {
  const [modoKey, setModoKey] = useState('claro');
  const [moduloActivo, setModuloActivo] = useState('dashboard');
  const [unidadActiva, setUnidadActiva] = useState(FLOTA_COMPLETA[0]);
  const [sonidoHabilitado, setSonidoHabilitado] = useState(true);

  // Modales
  const [modalCita, setModalCita] = useState(false);
  const [modalIdeaCustom, setModalIdeaCustom] = useState(false);

  // Cotizador
  const [tonelaje, setTonelaje] = useState(24);
  const [distanciaKm, setDistanciaKm] = useState(680);
  const [tipoServicio, setTipoServicio] = useState('refrigerado');

  const t = PALETAS_SISTEMA[modoKey];

  const triggerSound = (freq = 520) => {
    playUISound(freq, 'sine', 0.05, sonidoHabilitado);
  };

  const tarifas = { seco: 4.1, refrigerado: 5.8, hazmat: 7.6, pesado: 9.8 };
  const costoTotal = Math.round(distanciaKm * tonelaje * tarifas[tipoServicio] + 240);
  const galonesEst = Math.round(distanciaKm / 3.1);

  const handleWhatsAppRedirect = (motivo, detalle = '') => {
    triggerSound(880);
    const msg = `Hola Ing. Dayron. Vengo de interactuar con la Plataforma Enterprise [REF: LOGIX-CTO-PRO].%0A%0A*Acción:* ${motivo}%0A*Detalle Técnico:* ${detalle || `Unidad: ${unidadActiva.id} | Módulo: ${moduloActivo}`}%0A%0ASolicito agendar una sesión de arquitectura para implementar este sistema en nuestra empresa.`;
    window.open(`https://wa.me/573104208919?text=${msg}`, '_blank');
  };

  return (
    <div className={`min-h-screen ${t.bgApp} ${t.textMain} font-sans relative overflow-hidden pb-28 transition-colors duration-500 selection:bg-blue-600 selection:text-white`}>
      
      <ParticleBackground />

      <HeaderNav 
        t={t} 
        modoKey={modoKey} 
        setModoKey={setModoKey} 
        moduloActivo={moduloActivo} 
        setModuloActivo={setModuloActivo}
        sonidoHabilitado={sonidoHabilitado}
        setSonidoHabilitado={setSonidoHabilitado}
        triggerSound={triggerSound}
        setModalCita={setModalCita}
      />

      <main className="relative z-10 pt-28 px-6 max-w-7xl mx-auto space-y-12">
        
        {moduloActivo === 'dashboard' && (
          <div className="space-y-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className={`inline-flex items-center gap-2 font-mono text-xs ${t.badge} px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md`}>
                  <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  <span>Telemetría CanBUS & Tele-Control Activo</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 font-mono">
                  Plataforma Operativa de <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 dark:from-blue-400 dark:to-cyan-400">
                    Ingeniería & Carga Pesada.
                  </span>
                </h1>

                <p className={`text-base ${t.textMuted} mb-8 leading-relaxed font-light max-w-2xl`}>
                  Control térmico de Thermo-King, trazabilidad en ruta y simuladores paramétricos de fletes diseñados para operaciones corporativas de alto volumen.
                </p>

                <TiltCard className={`p-5 rounded-2xl ${t.bgCard} border ${t.border} shadow-xl mb-8 backdrop-blur-md`}>
                  <div className="flex items-start gap-4">
                    <Sparkles className={`w-6 h-6 ${t.accent} shrink-0 mt-0.5 animate-pulse`} />
                    <div className="text-xs">
                      <span className="font-mono font-bold block text-sm mb-1">¿Requieres un desarrollo personalizado?</span>
                      <span className={`${t.textMuted} font-light leading-relaxed block`}>
                        Cualquier flujo de trabajo, conexión con básculas de peso, alertas automatizadas o integraciones con SAP/Oracle se construyen a la medida.
                      </span>
                      <button 
                        onClick={() => { triggerSound(600); setModalIdeaCustom(true); }}
                        className={`inline-flex items-center gap-1.5 mt-3 ${t.accent} font-mono font-bold hover:underline`}
                      >
                        <span>+ Proponer requerimiento a la medida</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </TiltCard>

                <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs">
                  <button 
                    onClick={() => { triggerSound(750); setModalCita(true); }}
                    className={`${t.btnPrimary} px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Sesión de Desarrollo con CTO</span>
                  </button>

                  <button 
                    onClick={() => { triggerSound(500); setModuloActivo('tracking'); }}
                    className={`border ${t.border} ${t.textMain} font-bold px-8 py-4 rounded-xl hover:bg-slate-300/40 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2`}
                  >
                    <Navigation className={`w-4 h-4 ${t.accent}`} />
                    <span>Inspeccionar Mapa Satelital</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <TiltCard className={`${t.bgCard} p-7 rounded-3xl border ${t.border} shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-5`}>
                  <div className={`flex justify-between items-center pb-4 border-b ${t.border}`}>
                    <div className="flex items-center gap-3">
                      <Gauge className={`w-6 h-6 ${t.accent}`} />
                      <div>
                        <h3 className="text-base font-bold uppercase font-mono">Telemetría de Unidad {unidadActiva.id}</h3>
                        <p className={`text-[11px] ${t.textMuted} font-mono`}>Lectura CanBUS en Vivo</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800 font-bold">
                      TRANSMITIENDO 1Hz
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className={t.textMuted}>Variación de Temperatura Thermo-King</span>
                      <span className={`${t.accent} font-bold font-mono`}>{unidadActiva.temperatura}</span>
                    </div>
                    <LiveTelemetryChart color={modoKey === 'claro' ? '#1d4ed8' : '#3b82f6'} bgCardSubtle={t.bgCardSubtle} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className={`p-3.5 rounded-xl ${t.bgCardSubtle} border ${t.border}`}>
                      <span className={`${t.textMuted} text-[10px] uppercase block`}>Velocidad Promedio</span>
                      <span className="text-lg font-black mt-0.5 block">{unidadActiva.velocidad}</span>
                    </div>
                    <div className={`p-3.5 rounded-xl ${t.bgCardSubtle} border ${t.border}`}>
                      <span className={`${t.textMuted} text-[10px] uppercase block`}>Presión Llantas</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">{unidadActiva.presionPSI}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { triggerSound(700); setModalCita(true); }}
                    className={`w-full py-3.5 rounded-xl ${t.bgCardSubtle} border ${t.border} text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-300/40 dark:hover:bg-white/10`}
                  >
                    <Cpu className={`w-4 h-4 ${t.accent}`} />
                    <span>Cotizar Implementación de Hardware IoT</span>
                  </button>
                </TiltCard>
              </div>
            </div>
          </div>
        )}

        {moduloActivo === 'tracking' && (
          <GPSMapCanvas 
            t={t}
            modoKey={modoKey}
            unidadActiva={unidadActiva}
            FLOTA_COMPLETA={FLOTA_COMPLETA}
            setUnidadActiva={setUnidadActiva}
            triggerSound={triggerSound}
            handleWhatsAppRedirect={handleWhatsAppRedirect}
          />
        )}

        {moduloActivo === 'cotizador' && (
          <FreightSimulator 
            t={t}
            tipoServicio={tipoServicio}
            setTipoServicio={setTipoServicio}
            tonelaje={tonelaje}
            setTonelaje={setTonelaje}
            distanciaKm={distanciaKm}
            setDistanciaKm={setDistanciaKm}
            costoTotal={costoTotal}
            galonesEst={galonesEst}
            triggerSound={triggerSound}
            handleWhatsAppRedirect={handleWhatsAppRedirect}
          />
        )}

        {moduloActivo === 'custom' && (
          <CustomModuleBuilder 
            t={t}
            triggerSound={triggerSound}
            setModalIdeaCustom={setModalIdeaCustom}
          />
        )}

      </main>

      <LeadCaptureModal 
        t={t}
        modalCita={modalCita}
        setModalCita={setModalCita}
        modalIdeaCustom={modalIdeaCustom}
        setModalIdeaCustom={setModalIdeaCustom}
        triggerSound={triggerSound}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
      />

      {/* BANNER PERSISTENTE */}
      <div className={`fixed bottom-0 inset-x-0 ${t.bgNav} border-t ${t.border} p-4 backdrop-blur-2xl z-40 shadow-2xl font-mono`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 ${t.btnPrimary} rounded-xl shrink-0`}>
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                Plataforma Enterprise B2B <span className={`${t.accent} font-normal`}>/ DB Tech Studio</span>
              </p>
              <p className={`text-[11px] ${t.textMuted} mt-0.5`}>
                Desarrollo a la medida para empresas de transporte e industria.
              </p>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => { triggerSound(500); setModalIdeaCustom(true); }} 
              className={`w-full sm:w-auto border ${t.border} ${t.bgCardSubtle} font-bold text-xs px-5 py-3 rounded-xl transition-all`}
            >
              Tu Idea a Medida
            </button>
            <button 
              onClick={() => { triggerSound(800); setModalCita(true); }} 
              className={`w-full sm:w-auto ${t.btnPrimary} text-xs px-6 py-3 rounded-xl shadow-lg active:scale-95 transition-all`}
            >
              Agendar Cita con Dayron
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;