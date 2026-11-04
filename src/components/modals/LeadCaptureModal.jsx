import React from 'react';
import { Calendar, Sparkles, X } from 'lucide-react';

export const LeadCaptureModal = ({ 
  t, 
  modalCita, 
  setModalCita, 
  modalIdeaCustom, 
  setModalIdeaCustom, 
  triggerSound, 
  handleWhatsAppRedirect 
}) => {
  return (
    <>
      {/* MODAL CITA CTO */}
      {modalCita && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className={`${t.bgCard} border ${t.border} w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl relative`}>
            <div className={`flex justify-between items-center mb-6 pb-4 border-b ${t.border}`}>
              <div className="flex items-center gap-2">
                <Calendar className={`w-5 h-5 ${t.accent}`} />
                <h3 className="font-bold text-base uppercase">Agendar Asesoría con el CTO</h3>
              </div>
              <button onClick={() => { triggerSound(300); setModalCita(false); }} className={`${t.textMuted} p-1`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setModalCita(false); handleWhatsAppRedirect('Cita-Asesoria-CTO'); }} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 uppercase font-bold">Tu Nombre & Cargo *</label>
                <input type="text" required placeholder="Ej. Ing. Carlos Rodríguez (Gerente)" className={`w-full ${t.inputBg} border ${t.border} p-3 rounded-xl outline-none`} />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 uppercase font-bold">Empresa / Entidad *</label>
                <input type="text" required placeholder="Ej. Transportes del Caribe S.A." className={`w-full ${t.inputBg} border ${t.border} p-3 rounded-xl outline-none`} />
              </div>
              <button type="submit" className={`w-full ${t.btnPrimary} py-4 rounded-xl text-xs font-bold uppercase tracking-wider mt-2 shadow-xl`}>
                Confirmar Agendamiento Directo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MÓDULO PERSONALIZADO */}
      {modalIdeaCustom && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className={`${t.bgCard} border ${t.border} w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl relative`}>
            <div className={`flex justify-between items-center mb-6 pb-4 border-b ${t.border}`}>
              <div className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${t.accent}`} />
                <h3 className="font-bold text-base uppercase">Materializa tu Requerimiento</h3>
              </div>
              <button onClick={() => { triggerSound(300); setModalIdeaCustom(false); }} className={`${t.textMuted} p-1`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.target);
                const idea = formData.get('idea');
                setModalIdeaCustom(false); 
                handleWhatsAppRedirect('Idea-Personalizada-Custom', `Idea: ${idea}`); 
              }} 
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-400 mb-1 uppercase font-bold">Describe la funcionalidad que necesitas *</label>
                <textarea 
                  name="idea"
                  required 
                  rows="4" 
                  placeholder="Ej. Requiero conectar la plataforma con sensores de báscula de peso..." 
                  className={`w-full ${t.inputBg} border ${t.border} p-3 rounded-xl outline-none`} 
                />
              </div>
              <button type="submit" className={`w-full ${t.btnPrimary} py-4 rounded-xl text-xs font-bold uppercase tracking-wider mt-2 shadow-xl`}>
                Enviar Requerimiento a WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};