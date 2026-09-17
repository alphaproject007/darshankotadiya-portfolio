export interface Project {
  id: string;
  company?: string;
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  period?: {
    start: string;
    end?: string;
  };
  links?: {
    website?: string;
    github?: string;
    demo?: string;
  };
  imageUrl?: string;
  highlights?: string[];
  category?: 'web' | 'mobile' | 'hybrid' | 'backend';
}
