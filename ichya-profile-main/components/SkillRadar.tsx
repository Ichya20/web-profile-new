import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const webDevData = [
  { subject: 'React/Frontend', score: 90, fullMark: 100 },
  { subject: 'HTML/CSS', score: 95, fullMark: 100 },
  { subject: 'Backend/API', score: 80, fullMark: 100 },
  { subject: 'Database', score: 75, fullMark: 100 },
  { subject: 'UI/UX Design', score: 80, fullMark: 100 },
];

const aiData = [
  { subject: 'Machine Learning', score: 85, fullMark: 100 },
  { subject: 'Computer Vision', score: 88, fullMark: 100 },
  { subject: 'Data Analysis', score: 90, fullMark: 100 },
  { subject: 'Python', score: 95, fullMark: 100 },
  { subject: 'C++', score: 80, fullMark: 100 },
];

const SkillRadar = () => {
  const [activeMode, setActiveMode] = useState('web'); 
  const currentData = activeMode === 'web' ? webDevData : aiData;

  // Ubah warna biar matching sama gradient web kamu (Blue untuk Web, Purple untuk AI)
  const chartColor = activeMode === 'web' ? '#3b82f6' : '#a855f7'; 

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      
      {/* Tombol Interaktif bergaya Glassmorphism */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button 
          onClick={() => setActiveMode('web')}
          className={`px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
            activeMode === 'web' 
              ? 'bg-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] scale-105' 
              : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Fullstack Focus
        </button>
        <button 
          onClick={() => setActiveMode('ai')}
          className={`px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
            activeMode === 'ai' 
              ? 'bg-purple-500 text-white shadow-[0_10px_30px_rgba(168,85,247,0.4)] scale-105' 
              : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          AI Research Focus
        </button>
      </div>

      {/* Radar Chart Container ala Glass Card */}
      <div className="w-full h-[400px] md:h-[500px] bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-4 md:p-10 shadow-2xl transition-all duration-700 hover:border-white/20 group">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={currentData}>
            {/* Garis jaring laba-laba */}
            <PolarGrid stroke="#334155" /> 
            {/* Label teks di ujung jaring */}
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 700 }} /> 
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            
            {/* Tooltip melayang saat mouse diarahkan ke grafik */}
            <Tooltip 
              cursor={false}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff' }}
              itemStyle={{ color: chartColor, fontWeight: 'bold' }}
            />

            {/* Bentuk area grafiknya */}
            <Radar 
              name="Proficiency" 
              dataKey="score" 
              stroke={chartColor} 
              strokeWidth={3}
              fill={chartColor} 
              fillOpacity={0.4} 
              animationDuration={1000}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillRadar;