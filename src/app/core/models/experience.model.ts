export interface Experience {
  id: string;
  company: string;
  position: string;
  period: {
    start: string;
    end: string | null;
  };
  description: string;
  technologies: string[];
  highlights?: string[];
}
