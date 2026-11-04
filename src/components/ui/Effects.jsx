import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Fondo Global Trade (Mapa de puntos simulado) Dinámico
export const GlobalGridBackground = ({ theme }) => {
  const isLight = theme.id === 'eco';
  
  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${theme.bgApp} transition-colors duration-500`}>
      {/* Retícula base */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.accentHex} 1px, transparent 1px), linear-gradient(to bottom, ${theme.accentHex} 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem'
        }}
      />
      {/* Gradiente de enmascaramiento */}
      <div className={`absolute inset-0 ${theme.bgApp} [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_10%,#000_100%)]`} />
      
      {/* Destellos de radar/satélite */}
      {!isLight && (
        <>
          <div 
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] blur-[140px] rounded-full mix-blend-screen transition-colors duration-1000"
            style={{ backgroundColor: `${theme.accentHex}15` }}
          />
          <div 
            className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] blur-[160px] rounded-full mix-blend-screen transition-colors duration-1000"
            style={{ backgroundColor: `${theme.accentHex}10` }}
          />
        </>
      )}
    </div>
  );
};

// Tarjeta de Carga / Contenedor Dinámica
export const FreightCard = ({ children, className = "", theme, onClick }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden border ${theme.border} ${theme.bgCard} backdrop-blur-xl p-6 transition-all duration-300 ${theme.borderHover} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ boxShadow: opacity ? `0 0 30px ${theme.glow}` : 'none' }}
    >
      <div 
        className="absolute top-0 left-0 h-full w-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
        style={{ background: `linear-gradient(to bottom, transparent, ${theme.accentHex}80, transparent)` }}
      />
      
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${theme.glow}, transparent 40%)`,
        }}
      />
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
};

// Botón de Operaciones Logísticas
export const OpsButton = ({ children, onClick, icon: Icon, className = "", variant = 'primary', theme }) => {
  const base = "relative group inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-300 rounded-md";
  
  const isPrimary = variant === 'primary';
  const buttonStyle = isPrimary 
    ? `${theme.buttonBg} px-8 py-4 shadow-lg hover:shadow-xl hover:translate-y-[-1px]`
    : `bg-transparent border ${theme.border} ${theme.accent} hover:bg-[${theme.accentHex}10] px-8 py-4`;

  return (
    <button onClick={onClick} className={`${base} ${buttonStyle} ${className}`}>
      <span className="flex items-center gap-3 text-xs md:text-sm">
        {children}
        {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>
  );
};

export const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);