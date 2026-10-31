export type ProjectCategory = 'all' | 'web' | 'mobile' | 'tools';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, 'all'>;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}