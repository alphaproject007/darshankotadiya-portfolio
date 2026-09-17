export type ExperienceType = 'employment' | 'career-break';

export interface Experience {
  id: string;
  type?: ExperienceType;
  company?: string;
  position?: string;
  period: {
    start: string;
    end: string | null;
  };
  description: string;
  technologies: string[];
  highlights?: string[];
}
