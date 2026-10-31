import React from 'react';
import config from '@/payload.config';
import '@payloadcms/next/css';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap';

type Args = {
  children: React.ReactNode;
};

// Выносим Server Action на уровень модуля
async function serverFunction(args: Parameters<typeof handleServerFunctions>[0]) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
}

const Layout = ({ children }: Args) => {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
};

export default Layout;