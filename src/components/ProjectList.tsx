'use client';

import React, { useState, useMemo } from 'react';
import type { Project } from '@/types/project';
import { ProjectCard } from '@/components/ProjectCard';

interface ProjectListProps {
  initialProjects: Project[];
}

type FilterCategory = 'all' | 'web' | 'mobile' | 'tools';

export const ProjectList: React.FC<ProjectListProps> = ({ initialProjects }) => {
  const [activeTab, setActiveTab] = useState<FilterCategory>('all');

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return initialProjects;
    return initialProjects.filter((p) => p.category === activeTab);
  }, [activeTab, initialProjects]);

  const categories: { label: string; value: FilterCategory }[] = [
    { label: 'Все', value: 'all' },
    { label: 'Web', value: 'web' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Утилиты', value: 'tools' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-200">Проекты</h2>
        
        <div className="flex gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeTab === cat.value
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800/80 p-8 text-center text-xs font-mono text-zinc-500">
          Нет проектов в выбранной категории.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};