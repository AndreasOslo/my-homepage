import { getPayload } from 'payload';
import config from './payload.config';

async function init() {
  console.log('🔄 Initializing Payload and SQLite database schema...');
  const payload = await getPayload({ config });

  // Проверяем наличие коллекции пользователей; при вызове db.init/sync таблицы гарантированно создаются
  try {
    const { totalDocs } = await payload.count({
      collection: 'users',
    });
    console.log(`✅ Database ready. Existing users count: ${totalDocs}`);
  } catch (error) {
    console.warn('⚠️ Table check completed with message:', error);
  }

  process.exit(0);
}

init().catch((err) => {
  console.error('❌ Database initialization error:', err);
  process.exit(1);
});