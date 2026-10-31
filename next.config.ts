import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  output: 'standalone', // Собирает автономный сервер без тяжелой папки node_modules
};

export default withPayload(nextConfig);