import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ProjectList } from '@/components/ProjectList';
import type { Project } from '@/types/project';

async function getProjects(): Promise<Project[]> {
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    sort: '-createdAt',
  });

  return docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    description: doc.description,
    category: doc.category as Project['category'],
    stack: Array.isArray(doc.stack) ? doc.stack.map((item) => item.tech) : [],
    repoUrl: doc.repoUrl || undefined,
    liveUrl: doc.liveUrl || undefined,
    featured: Boolean(doc.featured),
  }));
}

export default async function HomePage(): Promise<React.JSX.Element> {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between px-6 py-8 sm:px-12 md:py-12">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <header className="space-y-4 border-b border-zinc-800 pb-6">
          <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Open for Internship & Projects
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Software Developer
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Разработка современных веб-интерфейсов и инструментов с упором на
            производительность, строгую типизацию и динамическое управление контентом.
          </p>
        </header>

        <section>
          <ProjectList initialProjects={projects} />
        </section>
      </div>

      <footer className="w-full max-w-4xl mx-auto pt-8 border-t border-zinc-800 flex flex-row justify-between items-center text-xs text-zinc-500 font-mono">
        <div>Next.js 15 • Tailwind CSS v4 • Payload CMS</div>
        <div className="flex gap-4">
          <Link
            href="/admin"
            className="hover:text-zinc-300 transition-colors underline underline-offset-4"
          >
            Admin Panel
          </Link>
        </div>
      </footer>
    </main>
  );
}