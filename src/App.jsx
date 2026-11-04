import React, { useState } from 'react';
import { 
  Truck, ShieldCheck, Navigation, ArrowRight, ChevronRight, 
  Clock, Phone, Search, MapPin, PackageCheck, Anchor, Plane, 
  Leaf, X, Calculator, Cpu, Palette
} from 'lucide-react';

import { 
  GlobalGridBackground, 
  FreightCard, 
  OpsButton, 
  Reveal 
} from './components/ui/Effects';

// MOTOR DE TEMAS LOGÍSTICOS
const themeConfig = {
  ocean: {
    id: 'ocean', name: 'Ocean Freight (Azul Marino)',
    bgApp: 'bg-slate-950', bgNav: 'bg-slate-950/95', bgCard: 'bg-slate-900/80',
    textMain: 'text-slate-100', textMuted: 'text-slate-400',
    accent: 'text-blue-500', accentHex: '#3b82f6',
    border: 'border-blue-500/30', borderHover: 'hover:border-blue-500/50',
    buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white',
    glow: 'rgba(59,130,246,0.15)',
    gridLines: 'border-slate-800'
  },
  express: {
    id: 'express', name: 'Express Air (Rojo/Carbón)',
    bgApp: 'bg-neutral-950', bgNav: 'bg-neutral-950/95', bgCard: 'bg-neutral-900/80',
    textMain: 'text-neutral-100', textMuted: 'text-neutral-400',
    accent: 'text-red-600', accentHex: '#dc2626',
    border: 'border-red-600/30', borderHover: 'hover:border-red-600/50',
    buttonBg: 'bg-red-600 hover:bg-red-500 text-white',
    glow: 'rgba(220,38,38,0.15)',
    gridLines: 'border-neutral-800'
  },
  eco: {
    id: 'eco', name: 'Eco Transit (Verde)',
    bgApp: 'bg-zinc-50', bgNav: 'bg-zinc-50/95', bgCard: 'bg-white/80',
    textMain: 'text-zinc-900', textMuted: 'text-zinc-600',
    accent: 'text-emerald-600', accentHex: '#059669',
    border: 'border-emerald-600/30', borderHover: 'hover:border-emerald-600/50',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    glow: 'rgba(5,150,105,0.08)',
    gridLines: 'border-zinc-200'
  }
};

// --- COMPONENTE MODAL REUTILIZABLE ---
const Modal = ({ isOpen, onClose, title, children, icon: Icon, t }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className={`absolute inset-0 ${t.bgApp} opacity-90 backdrop-blur-sm cursor-pointer`} onClick={onClose} />
      <div className={`relative ${t.bgCard} border ${t.border} w-full max-w-lg shadow-2xl rounded-xl animate-in fade-in zoom-in duration-200`}>
        <div className={`flex items-center justify-between p-4 border-b ${t.gridLines} ${t.id === 'eco' ? 'bg-zinc-100' : 'bg-black/50'} rounded-t-xl`}>
          <div className={`flex items-center gap-2 ${t.accent} font-bold text-xs uppercase tracking-widest`}>
            {Icon && <Icon className="w-4 h-4" />}
            {title}
          </div>
          <button onClick={onClose} className={`${t.textMuted} hover:${t.accent} transition-colors`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeModal, setActiveModal] = useState(null); // 'tracking' | 'quote' | null
  const [activeTheme, setActiveTheme] = useState('ocean');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingStatus, setTrackingStatus] = useState(null); // null | 'loading' | 'found'

  const t = themeConfig[activeTheme];

  const servicios = [
    { titulo: "Transporte Marítimo FCL/LCL", descripcion: "Alianzas con las principales navieras para rutas globales con capacidad garantizada.", icono: Anchor },
    { titulo: "Flete Aéreo Express", descripcion: "Soluciones de consolidación y vuelos chárter para carga crítica y de alto valor.", icono: Plane },
    { titulo: "Aduanas & Cumplimiento", descripcion: "Agenciamiento aduanero ágil, clasificación arancelaria y gestión de permisos sanitarios.", icono: ShieldCheck }
  ];

  const handleComercialContact = (messageType) => {
    let mensaje = "Hola Ing. Dayron. Estoy viendo el Demo de Logística y me interesa cotizar una plataforma similar para mi empresa.";
    if (messageType === 'flete') {
      mensaje = "Hola. Vengo de la plataforma interactiva y deseo cotizar un servicio de flete/transporte de carga.";
    }
    window.open(`https://wa.me/573104208919?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const simulateTracking = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setTrackingStatus('loading');
    setTimeout(() => {
      setTrackingStatus('found');
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${t.bgApp} ${t.textMain} font-sans relative overflow-hidden pb-24 transition-colors duration-500`}>
      <GlobalGridBackground theme={t} />
      
      {/* NAVEGACIÓN INDUSTRIAL */}
      <nav className={`fixed w-full z-50 ${t.bgNav} backdrop-blur-md border-b ${t.gridLines} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${t.buttonBg} p-2.5 rounded-md shadow-lg`}>
              {t.id === 'eco' ? <Leaf className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
            </div>
            <div>
              <span className={`font-black text-2xl tracking-wider ${t.textMain} block leading-none`}>LOGIX</span>
              <span className={`font-bold text-[10px] tracking-[0.25em] ${t.accent} uppercase`}>Global Transit</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 font-semibold text-xs tracking-wider uppercase">
            {/* SELECTOR DE TEMAS */}
            <div className={`flex items-center gap-2 mr-4 px-4 py-2 border ${t.border} bg-opacity-50 rounded-full`}>
              <Palette className={`w-3.5 h-3.5 ${t.accent}`} />
              {Object.keys(themeConfig).map((themeKey) => (
                <button 
                  key={themeKey}
                  onClick={() => setActiveTheme(themeKey)}
                  className={`w-3 h-3 rounded-full border border-black/20 transition-transform ${activeTheme === themeKey ? 'scale-125 ring-2 ring-offset-1 ring-offset-transparent ring-current' : 'opacity-50 hover:opacity-100'} 
                  ${themeKey === 'ocean' ? 'bg-blue-600' : themeKey === 'express' ? 'bg-red-600' : 'bg-emerald-600'}`}
                  style={{ color: themeConfig[themeKey].accentHex }}
                  title={themeConfig[themeKey].name}
                />
              ))}
            </div>

            <a href="#servicios" className={`${t.textMuted} hover:${t.accent} transition-colors`}>Servicios</a>
            <button 
              onClick={() => {setActiveModal('tracking'); setTrackingStatus(null); setTrackingNumber('');}}
              className={`${t.textMuted} hover:${t.accent} transition-colors flex items-center gap-1`}
            >
              <Search className="w-4 h-4" /> Rastrear Envío
            </button>
            <OpsButton variant="primary" className="!px-5 !py-2.5 !text-xs" theme={t} onClick={() => setActiveModal('quote')}>
              Cotizar Carga
            </OpsButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION LOGÍSTICA */}
      <section className="relative z-10 pt-36 pb-20 px-6 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          
          <Reveal>
            <div className="max-w-2xl">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border ${t.border} ${t.accent} text-xs font-bold mb-6 uppercase tracking-widest`} style={{ backgroundColor: `${t.accentHex}10` }}>
                <ShieldCheck className="w-4 h-4" />
                <span>Operador Logístico Certificado OEA</span>
              </div>
              
              <h1 className={`text-4xl lg:text-6xl font-black tracking-tight mb-6 ${t.textMain} leading-[1.15]`}>
                Mover tu Carga <br/>
                <span className={t.accent}>Segura, Eficiente</span><br/>
                y Siempre a Tiempo.
              </h1>
              
              <p className={`text-lg ${t.textMuted} mb-8 leading-relaxed font-normal`}>
                Soluciones integrales de transporte intermodal, agenciamiento aduanero y control telemático en tiempo real para cadenas de suministro globales.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <OpsButton icon={ArrowRight} onClick={() => setActiveModal('quote')} theme={t}>
                  Calculadora de Fletes
                </OpsButton>
                <OpsButton variant="outline" icon={Navigation} onClick={() => {setActiveModal('tracking'); setTrackingStatus(null); setTrackingNumber('');}} theme={t}>
                  Rastrear Guía (AWB/BL)
                </OpsButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* WIDGET RÁPIDO DE RASTREO (HERO) */}
            <div className={`relative h-auto min-h-[480px] lg:h-[540px] rounded-xl ${t.bgCard} overflow-hidden border ${t.gridLines} shadow-2xl flex flex-col justify-end p-8`}>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
              <div className={`absolute inset-0 bg-gradient-to-t from-${t.bgApp.replace('bg-', '')} via-${t.bgApp.replace('bg-', '')}/60 to-transparent`}></div>
              
              <div className={`relative z-10 bg-${t.id === 'eco' ? 'white' : 'black'}/60 backdrop-blur-xl border ${t.border} p-6 rounded-xl`}>
                <h3 className={`font-bold ${t.textMain} mb-4 flex items-center gap-2`}>
                  <Search className={`w-5 h-5 ${t.accent}`} />
                  Rastreo Rápido de Carga
                </h3>
                <form onSubmit={(e) => { e.preventDefault(); setActiveModal('tracking'); setTrackingStatus('loading'); }} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ingrese BL o Guía Aérea..." 
                    className={`w-full ${t.bgApp} border ${t.gridLines} p-3 rounded-md ${t.textMain} outline-none focus:${t.border} font-mono text-sm`}
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <button type="submit" className={`${t.buttonBg} px-6 rounded-md font-bold transition-all`}>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MÉTRICAS OPERATIVAS */}
      <section className={`relative z-10 ${t.bgCard} py-12 border-y ${t.gridLines}`}>
        <Reveal>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "+250K Ton", label: "Volumen Anual" },
              { val: "99.4%", label: "Puntualidad Entregas" },
              { val: "24/7", label: "Soporte Satelital" },
              { val: "ISO 39001", label: "Certificación Activa" }
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-3xl lg:text-4xl font-black ${t.accent} mb-1`}>{stat.val}</div>
                <div className={`text-[11px] uppercase tracking-widest ${t.textMuted} font-semibold`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SERVICIOS CLAVE */}
      <section id="servicios" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className={`${t.accent} font-bold text-xs uppercase tracking-widest block mb-2`}>Capacidad Operativa</span>
              <h2 className={`text-3xl lg:text-4xl font-black ${t.textMain}`}>Soluciones Integrales Globales</h2>
            </div>
            <p className={`${t.textMuted} max-w-md mt-4 md:mt-0 text-sm font-normal`}>
              Infraestructura logística diseñada para mantener las cadenas de suministro internacionales en movimiento continuo.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {servicios.map((servicio, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <FreightCard theme={t} className="h-full flex flex-col group rounded-xl">
                <div className={`p-3.5 rounded-md w-fit border ${t.gridLines} mb-6 transition-colors ${t.bgApp}`}>
                  <servicio.icono className={`w-6 h-6 ${t.accent}`} />
                </div>
                <h3 className={`text-xl font-bold ${t.textMain} mb-3`}>{servicio.titulo}</h3>
                <p className={`${t.textMuted} text-sm mb-6 leading-relaxed font-normal`}>{servicio.descripcion}</p>
                <button className={`${t.accent} font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all mt-auto`}>
                  Conocer Detalles <ChevronRight className="w-4 h-4" />
                </button>
              </FreightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- MODALES INTERACTIVOS --- */}

      {/* Modal 1: Centro de Rastreo (Tracking) */}
      <Modal isOpen={activeModal === 'tracking'} onClose={() => setActiveModal(null)} title="Centro de Monitoreo de Carga" icon={Navigation} t={t}>
        <form onSubmit={simulateTracking} className="mb-6">
          <label className={`font-bold text-xs ${t.accent} mb-2 block uppercase tracking-wider`}>Número de Guía (AWB/BL/Contenedor)</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className={`w-full ${t.bgApp} border ${t.gridLines} p-3 rounded-md ${t.textMain} outline-none focus:${t.border} font-mono uppercase`} 
              placeholder="Ej: MSCU-1234567"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
            <OpsButton type="submit" className="!px-6" theme={t}>Buscar</OpsButton>
          </div>
        </form>

        {trackingStatus === 'loading' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className={`w-10 h-10 border-4 border-${t.gridLines.replace('border-', '')} border-t-${t.accent.replace('text-', '')} rounded-full animate-spin mb-4`}></div>
            <p className={`${t.textMuted} font-mono text-sm animate-pulse`}>Conectando con red satelital...</p>
          </div>
        )}

        {trackingStatus === 'found' && (
          <div className={`border ${t.gridLines} ${t.bgApp} p-6 rounded-lg animate-in slide-in-from-bottom-4 duration-300`}>
            <div className="flex justify-between items-start mb-6 border-b border-dashed border-gray-500/30 pb-4">
              <div>
                <p className={`text-xs ${t.textMuted} uppercase tracking-widest mb-1`}>Envío Encontrado</p>
                <p className={`font-mono text-xl font-bold ${t.textMain}`}>{trackingNumber.toUpperCase() || 'AWB-883921'}</p>
              </div>
              <div className={`px-3 py-1 bg-opacity-10 border ${t.border} ${t.accent} rounded-full text-xs font-bold`} style={{ backgroundColor: `${t.accentHex}10` }}>
                EN TRÁNSITO
              </div>
            </div>
            
            {/* Timeline Simulado */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-500/30 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 ${t.bgApp} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`} style={{ borderColor: t.accentHex }}>
                  <PackageCheck className={`w-4 h-4 ${t.accent}`} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-500/20 bg-black/10 shadow">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className={`font-bold ${t.textMain}`}>Liberación de Aduana</div>
                    <time className={`font-mono text-xs ${t.accent}`}>Hoy, 08:30</time>
                  </div>
                  <div className={`text-xs ${t.textMuted}`}>Puerto de Buenaventura, CO</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 ${t.bgApp} border-gray-500/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                  <MapPin className={`w-4 h-4 ${t.textMuted}`} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-500/20 bg-black/10 shadow opacity-60">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className={`font-bold ${t.textMain}`}>Entrega Estimada</div>
                    <time className={`font-mono text-xs ${t.textMuted}`}>Mañana</time>
                  </div>
                  <div className={`text-xs ${t.textMuted}`}>Bogotá D.C., Centro Logístico</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal 2: Calculadora de Fletes (Cotización) */}
      <Modal isOpen={activeModal === 'quote'} onClose={() => setActiveModal(null)} title="Cotizador de Carga RápidO" icon={Calculator} t={t}>
        <p className={`${t.textMuted} text-sm mb-6`}>
          Complete los detalles de su carga para obtener un estimado de flete marítimo, aéreo o terrestre.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`font-bold text-[10px] ${t.accent} mb-1 block uppercase tracking-widest`}>Origen</label>
              <input type="text" className={`w-full ${t.bgApp} border ${t.gridLines} p-3 rounded-md ${t.textMain} outline-none focus:${t.border} text-sm`} placeholder="Ciudad / Puerto" />
            </div>
            <div>
              <label className={`font-bold text-[10px] ${t.accent} mb-1 block uppercase tracking-widest`}>Destino</label>
              <input type="text" className={`w-full ${t.bgApp} border ${t.gridLines} p-3 rounded-md ${t.textMain} outline-none focus:${t.border} text-sm`} placeholder="Ciudad / Puerto" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`font-bold text-[10px] ${t.accent} mb-1 block uppercase tracking-widest`}>Tipo de Carga</label>
              <select className={`w-full ${t.bgApp} border ${t.gridLines} p-3 rounded-md ${t.textMain} outline-none focus:${t.border} text-sm`}>
                <option>Carga General (LCL)</option>
                <option>Contenedor (FCL)</option>
                <option>Carga Peligrosa (IMO)</option>
              </select>
            </div>
            <div>
              <label className={`font-bold text-[10px] ${t.accent} mb-1 block uppercase tracking-widest`}>Peso Estimado (KG)</label>
              <input type="number" className={`w-full ${t.bgApp} border ${t.gridLines} p-3 rounded-md ${t.textMain} outline-none focus:${t.border} text-sm font-mono`} placeholder="0.00" />
            </div>
          </div>
          <OpsButton className="w-full mt-4 !py-3" onClick={() => handleComercialContact('flete')} theme={t}>
            Obtener Cotización con Asesor
          </OpsButton>
        </div>
      </Modal>

      {/* BANNER COMERCIAL DE ADQUISICIÓN DB TECH STUDIO */}
      <div className={`fixed bottom-0 left-0 right-0 z-[90] ${t.bgNav} backdrop-blur-2xl border-t-2 ${t.border} p-4 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`p-2 border ${t.border} rounded-md shrink-0`} style={{ backgroundColor: `${t.accentHex}10` }}>
              <Cpu className={`w-6 h-6 ${t.accent} animate-pulse`} />
            </div>
            <div>
              <p className={`${t.textMain} text-sm font-bold tracking-widest uppercase`}>
                Demo B2B Comercial <span className={`${t.accent} font-normal`}>/ DB Tech Studio</span>
              </p>
              <p className={`${t.textMuted} text-xs font-mono mt-0.5`}>
                Sistematice la cotización y rastreo de envíos para su empresa de logística.
              </p>
            </div>
          </div>
          <OpsButton icon={Phone} onClick={() => handleComercialContact('demo')} className="w-full sm:w-auto !py-3" theme={t}>
            Solicitar Presupuesto
          </OpsButton>
        </div>
      </div>
    </div>
  );
};

export default App;