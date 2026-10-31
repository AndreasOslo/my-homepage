import { Project } from '@/types/project';

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Developer Workspace & Portfolio',
    description: 'Статический сайт-визитка с генерацией страниц без серверного рантайма.',
    category: 'web',
    stack: ['Next.js 15', 'Tailwind CSS v4', 'TypeScript'],
    repoUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'LogicLink Mobile App',
    description: 'Мобильное приложение для аналитики и системной интеграции сервисов.',
    category: 'mobile',
    stack: ['React Native', 'TypeScript', 'PostgreSQL'],
    liveUrl: 'https://play.google.com',
    featured: true,
  },
  {
    id: '3',
    title: 'CSV Data Aggregator',
    description: 'Скрипт потоковой обработки и суммирования структурированных данных.',
    category: 'tools',
    stack: ['Python', 'Data Processing', 'CLI'],
    repoUrl: 'https://github.com',
    featured: false,
  },
];