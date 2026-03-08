
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", glowColor = "rgba(59, 130, 246, 0.15)" }) => {
  return (
    <div 
      className={`relative group rounded-[2rem] bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20 overflow-hidden ${className}`}
    >
      <div 
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`
        }}
      />
      {/* Gloss reflection line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
