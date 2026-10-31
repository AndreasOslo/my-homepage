import React from 'react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <article className="flex flex-col justify-between p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
      <div>
        <h3 className="text-sm font-semibold text-zinc-100">{project.title}</h3>
        <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/60 space-y-3">
        <div className="flex flex-wrap gap-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-800/60 text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 text-[11px] font-medium">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4"
            >
              Репозиторий →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4"
            >
              Демо →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}