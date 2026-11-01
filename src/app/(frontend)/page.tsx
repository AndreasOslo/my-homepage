import React from 'react';
import { ProjectList } from '@/components/ProjectList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
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
          <ProjectList />
        </section>
      </div>
    </main>
  );
}