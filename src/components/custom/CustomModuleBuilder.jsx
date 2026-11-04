import React from 'react';
import { Wrench, Sparkles, Server, Cpu, ShieldCheck } from 'lucide-react';

export const CustomModuleBuilder = ({ t, triggerSound, setModalIdeaCustom }) => {
  return (
    <div className="space-y-8">
      <div className={`p-8 md:p-12 rounded-3xl ${t.bgCard} border ${t.border} text-center relative overflow-hidden backdrop-blur-xl font-mono`}>
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${t.badge} text-xs mb-6 border`}>
          <Wrench className={`w-4 h-4 ${t.accent}`} />
          <span>Arquitectura de Software Adaptativa B2B</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black mb-4">
          Materializamos cualquier Requerimiento o Módulo Custom
        </h2>

        <p className={`text-sm ${t.textMuted} max-w-2xl mx-auto mb-8 font-light leading-relaxed`}>
          Desarrollo e integración de básculas de peso, sensores IoT a medida, conectores SAP/Oracle ERP y soluciones web empresariales.
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto mb-8">
          <div className={`p-5 rounded-2xl ${t.bgCardSubtle} border ${t.border}`}>
            <Server className={`w-6 h-6 ${t.accent} mb-2`} />
            <h4 className="font-bold text-sm mb-1">Integración ERP / SAP</h4>
            <p className={`text-xs ${t.textMuted}`}>Conexión bidireccional vía REST APIs y Webhooks.</p>
          </div>
          <div className={`p-5 rounded-2xl ${t.bgCardSubtle} border ${t.border}`}>
            <Cpu className={`w-6 h-6 ${t.accent} mb-2`} />
            <h4 className="font-bold text-sm mb-1">Telemetría CanBUS</h4>
            <p className={`text-xs ${t.textMuted}`}>Lectura directa de sensores de la computadora del vehículo.</p>
          </div>
          <div className={`p-5 rounded-2xl ${t.bgCardSubtle} border ${t.border}`}>
            <ShieldCheck className={`w-6 h-6 ${t.accent} mb-2`} />
            <h4 className="font-bold text-sm mb-1">Cifrado & Auditoría</h4>
            <p className={`text-xs ${t.textMuted}`}>Logs inalterables para cumplimiento normativo e inspecciones.</p>
          </div>
        </div>

        <button
          onClick={() => { triggerSound(700); setModalIdeaCustom(true); }}
          className={`${t.btnPrimary} px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all inline-flex items-center gap-2`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Proponer un Módulo Personalizado</span>
        </button>
      </div>
    </div>
  );
};