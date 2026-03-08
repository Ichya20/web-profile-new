
import { Project, Experience, Skill } from './types';

export const PROFILE = {
  name: "Ichya Ulumiddiin",
  taglines: [
    "Informatics Engineering Student",
    "AI Researcher",
    "Fullstack Developer"
  ],
  location: "Brebes, Indonesia",
  bio: "A top graduate from SMA Negeri 01 Tanjung, currently pursuing a Bachelor's in Informatics Engineering at Telkom University Purwokerto. Passionate about Advanced AI, Computer Vision, and Web Development.",
  github: "https://github.com/Ichya20",
  email: "ichya.dev@example.com", 
  linkedin: "https://linkedin.com/in/ichya20" 
};

export const PROJECTS: Project[] = [
  {
    title: "Hybrid-Fusion Image Classification",
    description: "An advanced research project combining EfficientNetV2, Vision Transformer (ViT), GLCM, and LBP features for high-accuracy classification.",
    tech: ["Python", "Deep Learning", "ViT", "EfficientNetV2"],
    link: "https://github.com/Ichya20",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sign-Language Detection",
    description: "A real-time sign language recognition system using MediaPipe and Machine Learning models to bridge communication gaps.",
    tech: ["Python", "Computer Vision", "MediaPipe", "TensorFlow"],
    link: "https://github.com/Ichya20",
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "React AI Object Detection",
    description: "A real-time web application for object detection using React and TensorFlow.js (MobileNet) directly in the browser.",
    tech: ["React", "JavaScript", "TensorFlow.js", "MobileNet"],
    link: "https://github.com/Ichya20",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Website Developer Intern",
    company: "PT Aliqa Muslim Indonesia",
    period: "Jan 2026 - Feb 2026",
    description: "Developed front-end/back-end and performed debugging to optimize system reliability."
  },
  {
    role: "Freelance Web Developer",
    company: "Fiverr",
    period: "Aug 2024 - Oct 2024",
    description: "Built responsive websites and collaborated with global clients to deliver tailored digital solutions."
  },
  {
    role: "Freelance Data Research",
    company: "Fiverr",
    period: "Feb 2024 - Nov 2024",
    description: "Data validation and visualization for strategic projects across various industries."
  },
  {
    role: "Staff Team Reviewer",
    company: "Satria Muda Telkom University",
    period: "2024 - Present",
    description: "Contributing to organizational growth through rigorous review and academic support."
  }
];

export const SKILLS: (Skill & { icon?: string })[] = [
  { name: "Python", category: "Language", icon: "python" },
  { name: "JavaScript", category: "Language", icon: "javascript" },
  { name: "C++", category: "Language", icon: "cplusplus" },
  { name: "HTML5", category: "Language", icon: "html5" },
  { name: "CSS3", category: "Language", icon: "css3" },
  { name: "React", category: "Tool", icon: "react" },
  { name: "Laravel", category: "Tool", icon: "laravel" },
  { name: "TensorFlow", category: "Tool", icon: "tensorflow" },
  { name: "Git", category: "Tool", icon: "git" },
  { name: "GitHub", category: "Tool", icon: "github" },
  { name: "Critical Thinking", category: "Soft Skill" },
  { name: "Problem Solving", category: "Soft Skill" },
  { name: "Adaptability", category: "Soft Skill" }
];
