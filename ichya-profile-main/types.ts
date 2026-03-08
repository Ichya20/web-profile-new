
export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'Language' | 'Tool' | 'Soft Skill';
}
