import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Projects } from '@/payload/collections/Projects';
import { Users } from '@/payload/collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const dbPath = process.env.DATABASE_PATH || path.resolve(dirname, '../payload.db');
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'super-secret-dev-key-change-me-minimum-32-chars-long',
  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: `file:${dbPath}`,
    },
    push: true,
  }),
  // Принудительно вызываем инициализацию схемы при подключении
  onInit: async (payload) => {
    payload.logger.info('Payload CMS успешно инициализирован.');
  },
});