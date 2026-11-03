import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Package, 
  BarChart3, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Globe, 
  Phone,
  Navigation
} from 'lucide-react';

const App = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const servicios = [
    {
      titulo: "Transporte de Carga Pesada & Extra-dimensionada",
      descripcion: "Flota especializada de camiones y camabajas para maquinaria amarilla y equipos industriales.",
      icono: Truck
    },
    {
      titulo: "Logística para Hidrocarburos & Minería",
      descripcion: "Operaciones bajo rigurosos protocolos de seguridad ambiental y normativas del sector energético.",
      icono: ShieldCheck
    },
    {
      titulo: "Monitoreo GPS 24/7 & Telemetría",
      descripcion: "Trazabilidad en tiempo real de cada ruta con reportes de estatus y control de velocidad.",
      icono: Navigation
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* NAVEGACIÓN INDUSTRIAL */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2.5 rounded-md shadow-lg shadow-orange-600/20">
              <Truck className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-wider text-slate-100 block leading-none">LOGIX</span>
              <span className="font-bold text-[10px] tracking-[0.25em] text-orange-500 uppercase">Transporte & Carga</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-semibold text-xs tracking-wider uppercase text-slate-300">
            <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
            <a href="#flota" className="hover:text-orange-500 transition-colors">Nuestra Flota</a>
            <a href="#cobertura" className="hover:text-orange-500 transition-colors">Cobertura</a>
            <button className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-md font-bold transition-all shadow-md flex items-center gap-2 text-xs uppercase tracking-wider">
              <Phone className="w-4 h-4 text-slate-900" />
              Solicitar Cotización
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION LOGÍSTICA */}
      <section className="relative pt-36 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-orange-600/10 border border-orange-600/30 text-orange-500 text-xs font-bold mb-6 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Operador Logístico Certificado • Orinoquía & Nacional</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-black tracking-tight mb-6 text-slate-100 leading-[1.15]">
              Mover tu Carga <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
                Segura, Eficiente
              </span><br/>
              y Siempre a Tiempo.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-8 leading-relaxed font-normal">
              Soluciones integrales de transporte terrestre, carga seca y sobredimensionada con control telemático en tiempo real para sectores industrial y petrolero.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 hover:bg-orange-500 text-white px-7 py-3.5 rounded-md font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 group shadow-lg shadow-orange-600/20">
                Cotizar Flete de Carga
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-slate-800 border border-slate-700 hover:border-orange-500/50 text-slate-200 px-7 py-3.5 rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4 text-orange-500" />
                Rastrear Guía
              </button>
            </motion.div>
          </motion.div>

          {/* TARJETA VISUAL PREMIUM */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[480px] lg:h-[540px] rounded-xl bg-slate-800 overflow-hidden border border-slate-700 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-6 rounded-lg text-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <span className="font-extrabold text-xl text-orange-500">99.4% Puntualidad en Entregas</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Monitoreo satelital activo con alertas automáticas de ruta para garantizar cero retrasos operacionales.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MÉTRICAS OPERATIVAS */}
      <section className="bg-slate-950 py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-1">+250,000 Ton</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Transportadas Anualmente</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-1">+120</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Vehículos en Flota</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-1">24/7</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Soporte Satelital GPS</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-1">ISO 39001</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Seguridad Vial Certificada</div>
          </div>
        </div>
      </section>

      {/* SERVICIOS CLAVE */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest block mb-2">Capacidad Operativa</span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-100">Soluciones de Transporte Especializado</h2>
          </div>
          <p className="text-slate-400 max-w-md mt-4 md:mt-0 text-sm font-normal">
            Infraestructura logística diseñada para mantener las cadenas de suministro industriales en movimiento continuo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicios.map((servicio, idx) => {
            const Icono = servicio.icono;
            return (
              <div key={idx} className="bg-slate-800/80 p-8 rounded-lg border border-slate-700 hover:border-orange-500/50 transition-all duration-300 group">
                <div className="bg-slate-900 p-3.5 rounded-md w-fit border border-slate-700 mb-6 group-hover:border-orange-500/30 transition-colors">
                  <Icono className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-orange-500 transition-colors">{servicio.titulo}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-normal">{servicio.descripcion}</p>
                <button className="text-orange-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                  Conocer Detalles <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default App;