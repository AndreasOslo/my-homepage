import type { Metadata } from 'next';
import configPromise from '@/payload.config';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '@/app/(payload)/admin/importMap';

type Args = Parameters<typeof RootPage>[0];

export const generateMetadata = ({
  params,
  searchParams,
}: {
  params: Args['params'];
  searchParams: Args['searchParams'];
}): Promise<Metadata> =>
  generatePageMetadata({
    config: configPromise,
    params,
    searchParams,
  });

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Args['params'];
  searchParams: Args['searchParams'];
}) {
  return RootPage({
    config: configPromise,
    params,
    searchParams,
    importMap,
  });
}