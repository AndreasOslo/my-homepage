import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Projects } from '@/payload/collections/Projects';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Берем путь из DATABASE_PATH или дефолтный локальный путь
const dbPath = process.env.DATABASE_PATH || path.resolve(dirname, '../payload.db');

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'super-secret-dev-key-change-me-minimum-32-chars',
  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: `file:${dbPath}`,
    },
  }),
});