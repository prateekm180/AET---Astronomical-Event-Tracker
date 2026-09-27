import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  size?: number;
}

export const AETLogo: React.FC<LogoProps> = ({ size = 26 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let pulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.03;
      pulse += 0.05;

      const centerX = 13;
      const centerY = 13;
      const pulseRadius = 6 + Math.sin(pulse) * 0.8;

      // Outer Glow
      const auraGradient = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, 12);
      auraGradient.addColorStop(0, "rgba(167, 139, 250, 0.6)");
      auraGradient.addColorStop(1, "transparent");
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Outer Ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 4, angle, 0, Math.PI * 2);
      ctx.strokeStyle = "#A78BFA";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Pulsing Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "#6B4FD8";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Nucleus
      ctx.beginPath();
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#EDE9F8";
      ctx.fill();

      // Satellite Orbit
      const satX = centerX + Math.cos(angle) * 10;
      const satY = centerY + Math.sin(angle) * 4;
      ctx.beginPath();
      ctx.arc(satX, satY, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#38BDF8";
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      onClick={handleLogoClick}
      className="flex items-center gap-2.5 cursor-pointer group"
    >
      <canvas ref={canvasRef} width={26} height={26} style={{ width: size, height: size }} />
      <span className="font-serif text-[22px] font-medium tracking-[0.5px] text-[#EDE9F8] group-hover:text-white transition-colors select-none">
        Aether
      </span>
    </div>
  );
};

export default AETLogo;