
import React from 'react';
import { Experience } from '../types';

interface TimelineProps {
  experiences: Experience[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  return (
    <div className="relative space-y-16 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-500/0 before:via-blue-500/40 before:to-blue-500/0">
      {experiences.map((exp, idx) => (
        <div key={idx} className="relative pl-16 group">
          {/* Dot Indicator */}
          <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-2xl border border-blue-500/30 bg-slate-950 text-blue-500 shadow-2xl z-10 transition-all duration-500 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a22 22 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
               <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0010 15c-2.796 0-5.487-.46-8-1.308z" />
             </svg>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <time className="mono text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest">{exp.period}</time>
              <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
            </div>
            
            <div className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">{exp.company}</div>
            
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl font-medium">
              {exp.description}
            </p>
            
            {/* Subtle decorative line */}
            <div className="h-[1px] w-20 bg-gradient-to-r from-blue-500/30 to-transparent transition-all group-hover:w-40"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
