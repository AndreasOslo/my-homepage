import React from 'react';
import type { Metadata } from 'next';
import configPromise from '@/payload.config';
import '@payloadcms/next/css';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import { importMap } from '@/app/(payload)/admin/importMap';
import type { ServerFunctionClient } from 'payload';

interface Args {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  description: 'Payload Admin Panel',
  title: 'Payload Admin',
};

// Исправленная типизация аргументов клиентского вызова serverFunction
const serverFunction: ServerFunctionClient = async (args) => {
  'use server';
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

export default async function Layout({ children }: Args): Promise<React.JSX.Element> {
  return (
    <RootLayout config={configPromise} serverFunction={serverFunction} importMap={importMap}>
      {children}
    </RootLayout>
  );
}