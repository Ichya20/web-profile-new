import React, { useState, useEffect } from 'react'; // <--- Tambahkan useEffect di sini
const myProjects = [
  {
    id: 'sign-language',
    title: 'Sign Language Detection',
    type: 'Computer Vision AI',
    description: 'Sistem deteksi bahasa isyarat real-time menggunakan kecerdasan buatan untuk menjembatani komunikasi.',
    tech: ['Python', 'MediaPipe', 'OpenCV'],
    stats: { logic: 95, ui: 70, ai: 98 },
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'sentiment',
    title: 'AI Sentiment Analysis',
    type: 'NLP & Web App',
    description: 'Aplikasi web cerdas untuk menganalisis sentimen teks dan ulasan secara otomatis menggunakan model AI.',
    tech: ['Python', 'React', 'Vite'],
    stats: { logic: 85, ui: 85, ai: 90 },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'library',
    title: 'Library Management',
    type: 'Desktop App / OOP',
    description: 'Sistem manajemen perpustakaan terstruktur dengan antarmuka grafis (GUI) yang mengimplementasikan struktur data kompleks.',
    tech: ['C++', 'GUI', 'Data Structures'],
    stats: { logic: 90, ui: 60, ai: 10 },
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop',
    color: 'from-emerald-400 to-teal-500'
  }
];

const InteractiveShowcase = () => {
  const [activeId, setActiveId] = useState(myProjects[0].id);
  const [shouldAnimate, setShouldAnimate] = useState(false); // State trigger animasi
  const activeProject = myProjects.find(p => p.id === activeId) || myProjects[0];

  useEffect(() => {
    setShouldAnimate(false);
    const timer = setTimeout(() => setShouldAnimate(true), 50); // Delay dikit biar transisi kerasa
    return () => clearTimeout(timer);
  }, [activeId]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-10 min-h-[500px]">
      
      {/* KIRI: List Project ala Menu Game */}
      <div className="lg:w-1/3 flex flex-col gap-4 border-r border-white/10 pr-0 lg:pr-8">
        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Select Project</p>
        
        {myProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className={`text-left p-5 rounded-2xl transition-all duration-500 relative overflow-hidden group ${
              activeId === project.id 
                ? 'bg-white/10 border-white/30 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                : 'bg-transparent border-transparent hover:bg-white/5 opacity-50 hover:opacity-100'
            } border`}
          >
            {/* Efek garis nyala di pinggir saat aktif */}
            <div className={`absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b ${project.color} transition-all duration-500 ${activeId === project.id ? 'opacity-100' : 'opacity-0'}`}></div>
            
            <h3 className="text-xl font-bold text-white mb-1 pl-3">{project.title}</h3>
            <p className="text-xs text-slate-400 font-mono pl-3">{project.type}</p>
          </button>
        ))}
      </div>

      {/* KANAN: Detail & Stats Project (Berubah dinamis pakai efek fade) */}
      <div key={activeProject.id} className="lg:w-2/3 flex flex-col justify-center animate-[fadeIn_0.7s_ease-in-out]">
        <div className="flex flex-wrap gap-3 mb-6">
          {activeProject.tech.map(t => (
            <span key={t} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${activeProject.color} text-white shadow-lg`}>
              {t}
            </span>
          ))}
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
          {activeProject.title}
        </h2>
        
        <p className="text-slate-300 text-lg mb-10 leading-relaxed font-medium max-w-2xl">
          {activeProject.description}
        </p>

        {/* Status Bar ala Atribut Karakter */}
        <div className="space-y-5 bg-black/30 p-6 rounded-3xl border border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Technical Specs</p>
          
          {[
            { label: 'Core Logic & Algorithm', value: activeProject.stats.logic },
            { label: 'AI / Model Complexity', value: activeProject.stats.ai },
            { label: 'UI / UX Implementation', value: activeProject.stats.ui },
          ].map((stat, idx) => (
            <div key={idx} className="w-full">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-slate-300">{stat.label}</span>
                <span className="font-mono text-white">{stat.value}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${activeProject.color} transition-all duration-500 ease-out`}
                  style={{ width: shouldAnimate ? `${stat.value}%` : '0%' }} // Bar animasi memanjang
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
            <button className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                View Source Code
            </button>
        </div>
      </div>

    </div>
  );
};

export default InteractiveShowcase;