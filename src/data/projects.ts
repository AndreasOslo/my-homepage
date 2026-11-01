import { Project } from '@/types/project';

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Developer Workspace & Portfolio',
    description: 'A static portfolio website with pages generated at build time.',
    category: 'web',
    stack: ['Next.js 15', 'Tailwind CSS v4', 'TypeScript'],
    repoUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'LogicLink Mobile App',
    description: 'A mobile app for analytics and service integration.',
    category: 'mobile',
    stack: ['React Native', 'TypeScript', 'PostgreSQL'],
    liveUrl: 'https://play.google.com',
    featured: true,
  },
  {
    id: '3',
    title: 'CSV Data Aggregator',
    description: 'A script for streaming and summarizing structured data.',
    category: 'tools',
    stack: ['Python', 'Data Processing', 'CLI'],
    repoUrl: 'https://github.com',
    featured: false,
  },
];