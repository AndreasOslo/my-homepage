import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ProjectList } from '@/components/ProjectList';
import { initialProjects as staticFallbackProjects } from '@/data/projects';
import type { Project } from '@/types/project';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  let projects: Project[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: 'projects',
      limit: 100,
    });

    if (docs && docs.length > 0) {
      projects = docs.map((doc: any) => ({
        id: String(doc.id),
        title: doc.title,
        description: doc.description || '',
        tags: Array.isArray(doc.tags) ? doc.tags.map((t: any) => t.tag || t) : [],
        githubUrl: doc.githubUrl || undefined,
        liveUrl: doc.liveUrl || undefined,
      }));
    } else {
      projects = staticFallbackProjects;
    }
  } catch (error) {
    console.warn('⚠️ Payload CMS offline or initializing, falling back to static projects:', error);
    projects = staticFallbackProjects;
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Портфолио проектов
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Разработка веб-приложений на Next.js 15, TypeScript и Payload CMS.
          </p>
        </header>

        <section>
          <ProjectList initialProjects={projects} />
        </section>
      </div>
    </main>
  );
}