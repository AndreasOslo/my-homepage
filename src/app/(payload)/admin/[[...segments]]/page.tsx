import type { Metadata } from 'next';
import config from '@/payload.config';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '../importMap';

type Args = {
  params: Promise<{
    segments?: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  const resolvedParams = await params;
  return generatePageMetadata({
    config,
    params: Promise.resolve({
      segments: resolvedParams.segments ?? [],
    }),
    searchParams,
  });
};

const Page = async ({ params, searchParams }: Args) => {
  const resolvedParams = await params;

  return (
    <RootPage
      config={config}
      params={Promise.resolve({
        segments: resolvedParams.segments ?? [],
      })}
      searchParams={searchParams}
      importMap={importMap}
    />
  );
};

export default Page;