
import React, { useEffect, useState, useRef } from 'react';
import { PROFILE, PROJECTS, EXPERIENCES, SKILLS } from './constants';
import Background from './components/Background';
import Typewriter from './components/Typewriter';
import GlassCard from './components/GlassCard';
import Timeline from './components/Timeline';
import myProfilePic from './assets/profile.jpg';
import { Link } from 'react-router-dom';
import SkillRadar from './components/SkillRadar';
import InteractiveShowcase from './components/InteractiveShowcase';

const STATS = [
  { label: 'Academic Rating', value: '4.0/4.0', sub: 'Top Graduate' },
  { label: 'Project Repos', value: '20+', sub: 'Active GitHub' },
  { label: 'Tools Mastered', value: '12+', sub: 'Cross-platform' },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName('group');
      for (const card of cards as any) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('opacity-0', 'translate-y-12', 'scale-95');
      observer.current?.observe(section);
    });

    return () => observer.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 overflow-x-hidden">
      <Background />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4 translate-y-0' : 'py-8'}`}>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="px-8 py-3 rounded-full bg-slate-950/40 backdrop-blur-2xl border border-white/10 flex items-center gap-6 md:gap-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-white relative group/nav ${activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-slate-400'}`}
              >
                {item}
                <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 bg-blue-500 rounded-full transition-all duration-500 ${activeSection === item.toLowerCase() ? 'w-4' : 'w-0 group-hover/nav:w-4'}`}></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-48 pb-32 space-y-48">
        
        {/* Hero Section */}
        <section id="about" className="relative flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="flex-1 space-y-10 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Researcher & Developer
            </div>
            <div className="space-y-4">
              <h2 className="text-slate-500 font-mono text-lg md:text-xl tracking-tight">I bridge the gap between AI and Design.</h2>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                {PROFILE.name.split(' ')[0]} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500">
                  {PROFILE.name.split(' ')[1]}
                </span>
              </h1>
            </div>
            <div className="text-2xl md:text-3xl font-light text-slate-300 min-h-[1.5em] italic serif">
              <Typewriter texts={PROFILE.taglines} />
            </div>
            <p className="text-slate-400 max-w-xl text-lg md:text-xl leading-relaxed font-medium border-l-2 border-blue-500/30 pl-6">
              {PROFILE.bio}
            </p>
            <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start pt-4">
              <button 
                onClick={() => scrollTo('projects')}
                className="group relative px-10 py-5 rounded-2xl bg-white text-slate-950 font-black tracking-wider uppercase text-xs transition-all hover:scale-105 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                View Showcase
              </button>
              <a 
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black tracking-wider uppercase text-xs transition-all hover:scale-105 backdrop-blur-md active:scale-95"
              >
                GitHub
              </a>
              <Link 
                to="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black tracking-wider uppercase text-xs transition-all hover:scale-105 backdrop-blur-md active:scale-95"
              >
                BLOG
              </Link>
            </div>
          </div>
          
          <div className="relative order-first md:order-last">
            <div className="absolute -inset-20 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="relative animate-float">
              <GlassCard className="p-3 !rounded-[4rem]">
                <img 
                  src={myProfilePic} 
                  alt={PROFILE.name}
                  className="w-72 h-96 md:w-[400px] md:h-[500px] rounded-[3.5rem] object-cover transition-all duration-700 grayscale hover:grayscale-0"
                />
              </GlassCard>
              {/* Floating Tech Tag */}
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 p-6 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl animate-bounce delay-700">
                <p className="text-[10px] font-black text-blue-400 tracking-widest uppercase mb-1">Expertise</p>
                <p className="text-white font-bold">Deep Learning</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <GlassCard key={i} className="p-10 text-center space-y-2 hover:scale-105 transition-transform duration-500">
              <h4 className="text-5xl font-black text-white tracking-tighter">{stat.value}</h4>
              <p className="text-blue-400 font-black text-xs uppercase tracking-widest">{stat.label}</p>
              <p className="text-slate-500 text-xs">{stat.sub}</p>
            </GlassCard>
          ))}
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="space-y-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="space-y-4">
              <p className="text-blue-500 font-black text-xs uppercase tracking-[0.4em]">Portfolio Showcase</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Selected Works.</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-sm leading-relaxed md:text-right">
              A collection of research papers, experimental algorithms, and full-stack solutions.
            </p>
          </div>
          <div className="w-full">
            <InteractiveShowcase />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project, idx) => (
              <GlassCard key={idx} className="h-full flex flex-col p-0 group/card duration-700">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[9px] font-black tracking-wider uppercase bg-black/50 text-white backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col space-y-6">
                  <h3 className="text-3xl font-bold text-white group-hover/card:text-blue-400 transition-colors leading-tight">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-grow font-medium">{project.description}</p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="group/link inline-flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                  >
                    View Project Case Study
                    <div className="w-8 h-[1px] bg-blue-500 transition-all group-hover/link:w-12"></div>
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div className="lg:col-span-5 space-y-12 sticky top-48">
            <div className="space-y-6">
              <p className="text-blue-500 font-black text-xs uppercase tracking-[0.4em]">Career Evolution</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">My Path.</h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
                From academic excellence to real-world industrial impact, I've consistently delivered high-quality software solutions.
              </p>
            </div>
            
            <GlassCard className="p-8 space-y-6 !rounded-3xl border-blue-500/20 bg-blue-500/5">
              <p className="text-white font-bold italic leading-relaxed">
                "Ichya brings a unique analytical perspective to every project, combining rigorous academic research with practical software engineering."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800"></div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">Industry Review</p>
                  <p className="text-[10px] text-slate-500">Professional Feedback</p>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div className="lg:col-span-7">
            <Timeline experiences={EXPERIENCES} />
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Skillset Mastery.</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">I leverage a diverse range of technologies to build scalable, AI-driven applications.</p>
          </div>

          <div className="w-full flex justify-center py-10">
            <SkillRadar />
          </div>
          
          <GlassCard className="p-12 md:p-20 !rounded-[4rem]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {['Language', 'Tool', 'Soft Skill'].map(category => (
                <div key={category} className="space-y-8">
                  <div className="flex items-center gap-4 group/cat">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">{category}s</span>
                    <div className="h-[2px] bg-blue-500/20 flex-grow transition-all group-hover/cat:bg-blue-500"></div>
                  </div>
                  <div className="flex flex-col gap-5">
                    {SKILLS.filter(s => s.category === category).map(skill => (
                      <div 
                        key={skill.name} 
                        className="group/skill flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
                      >
                        <div className="flex items-center gap-4">
                          {skill.icon ? (
                            <img 
                              src={`https://cdn.simpleicons.org/${skill.icon}/ffffff`} 
                              className="w-5 h-5 opacity-40 group-hover/skill:opacity-100 transition-all group-hover/skill:scale-110" 
                              alt={skill.name} 
                            />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          )}
                          <span className="text-sm font-bold text-slate-300 group-hover/skill:text-white transition-colors uppercase tracking-widest">{skill.name}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-700 group-hover/skill:bg-blue-500 transition-colors"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
          <GlassCard className="max-w-6xl mx-auto p-12 md:p-32 text-center space-y-16 !rounded-[5rem] border-blue-500/30 overflow-visible">
            <div className="space-y-8">
              <p className="text-blue-500 font-black text-xs uppercase tracking-[0.5em] animate-pulse">Get in Touch</p>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-white">
                Ready to make <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic">history?</span>
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
                Whether it's a new research project, a full-stack venture, or just a coffee chat — I'm all ears.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-10">
              <button 
                onClick={copyEmail}
                className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2 active:scale-95"
              >
                <div className="p-8 rounded-[2.5rem] bg-white text-slate-950 shadow-[0_25px_50px_rgba(255,255,255,0.1)] transition-all group-hover:shadow-[0_25px_60px_rgba(37,99,235,0.4)]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 group-hover:text-blue-400">Copy Email</span>
                {copySuccess && <span className="absolute -bottom-8 text-green-400 text-[10px] font-black uppercase tracking-widest animate-fade-in">Copied to Clipboard!</span>}
              </button>

              <a href={PROFILE.linkedin} target="_blank" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2 active:scale-95">
                <div className="p-8 rounded-[2.5rem] bg-[#0077B5] text-white shadow-[0_25px_50px_rgba(0,119,181,0.2)] transition-all hover:brightness-110">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 group-hover:text-[#0077B5]">LinkedIn</span>
              </a>

              <a href={PROFILE.github} target="_blank" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2 active:scale-95">
                <div className="p-8 rounded-[2.5rem] bg-slate-100 text-slate-950 shadow-[0_25px_50px_rgba(255,255,255,0.05)] transition-all hover:bg-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 group-hover:text-white">GitHub</span>
              </a>
            </div>
          </GlassCard>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 bg-slate-950/40 relative">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-3xl font-black tracking-tighter text-white">ICHYA<span className="text-blue-500">.DEV</span></h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[200px]">Design is thinking made visual. Code is design made functional.</p>
          </div>
          
          <div className="flex justify-center gap-12">
            {['About', 'Projects', 'Experience'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">{item}</button>
            ))}
          </div>
          
          <div className="text-center md:text-right space-y-2">
            <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">
              &copy; {new Date().getFullYear()} {PROFILE.name}
            </p>
            <p className="text-slate-700 text-[9px] uppercase tracking-[0.4em]">{PROFILE.location}</p>
          </div>
        </div>
        
        {/* Sub-footer */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-800 text-[9px] uppercase tracking-[0.8em]">Telkom University Purwokerto</p>
        </div>
      </footer>

      {/* Scroll to top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-12 right-12 p-6 rounded-[2rem] bg-slate-900/80 backdrop-blur-2xl border border-white/10 text-white transition-all duration-700 z-[100] hover:bg-white hover:text-slate-950 hover:-translate-y-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${scrolled ? 'opacity-100' : 'opacity-0 translate-y-20 pointer-events-none'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </button>
    </div>
  );
};

export default App;
