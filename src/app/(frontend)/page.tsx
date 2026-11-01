import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ProjectList } from '@/components/ProjectList';
import { PROJECTS_DATA as staticFallbackProjects } from '@/data/projects';
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
        category: doc.category || 'Web',
        stack: Array.isArray(doc.stack) ? doc.stack : [],
        repoUrl: doc.repoUrl || undefined,
        liveUrl: doc.liveUrl || undefined,
      }));
    } else {
      projects = staticFallbackProjects;
    }
  } catch (error) {
    console.warn(
      'Payload CMS is offline or initializing; falling back to static projects:',
      error
    );
    projects = staticFallbackProjects;
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Project Portfolio
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Building web applications with Next.js 15, TypeScript, and Payload CMS.
          </p>
        </header>

        <section>
          <ProjectList initialProjects={projects} />
        </section>
      </div>
    </main>
  );
}