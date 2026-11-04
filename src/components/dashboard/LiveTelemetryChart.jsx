import React, { useEffect, useRef } from 'react';

export const LiveTelemetryChart = ({ color = '#3b82f6', bgCardSubtle = 'bg-black/50' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let points = Array.from({ length: 45 }, (_, i) => 0.5 + Math.sin(i * 0.2) * 0.05);
    let targetVal = 0.5;
    let lastTargetUpdate = Date.now();

    const render = () => {
      const now = Date.now();
      if (now - lastTargetUpdate > 1200) {
        targetVal = 0.45 + Math.random() * 0.1;
        lastTargetUpdate = now;
      }

      const currentLast = points[points.length - 1];
      const nextVal = currentLast + (targetVal - currentLast) * 0.04;
      points.shift();
      points.push(nextVal);

      const w = canvas.width;
      const h = canvas.height;
      const paddingY = 10;
      const usableH = h - paddingY * 2;

      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();

      const getX = (i) => (i / (points.length - 1)) * w;
      const getY = (val) => h - paddingY - (val * usableH);

      ctx.moveTo(getX(0), getY(points[0]));

      for (let i = 0; i < points.length - 1; i++) {
        const x1 = getX(i);
        const y1 = getY(points[i]);
        const x2 = getX(i + 1);
        const y2 = getY(points[i + 1]);
        const midX = (x1 + x2) / 2;
        ctx.bezierCurveTo(midX, y1, midX, y2, x2, y2);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, `${color}25`);
      grad.addColorStop(1, `${color}00`);
      ctx.fillStyle = grad;
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [color]);

  return (
    <div className={`w-full ${bgCardSubtle} rounded-xl border border-slate-700/50 p-2 my-2 overflow-hidden`}>
      <canvas ref={canvasRef} width={340} height={75} className="w-full h-16 block" />
    </div>
  );
};