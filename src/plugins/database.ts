import type { Server } from '@hapi/hapi';
import { createConnection, getConnection } from 'typeorm';

export default {
  name: 'mysql',
  register: async (server: Server) => {
    // get the sql connection information
    // @ts-expect-error
    const sqlConfig = server.app.config.sql;

    // create an instance of the database client
    await createConnection({
      name: 'default',
      type: 'mysql',
      host: sqlConfig.host || '127.0.0.1',
      port: sqlConfig.port ? Number(sqlConfig.port) : 3306,
      username: sqlConfig.username,
      password: sqlConfig.password,
      database: sqlConfig.database,
      // synchronize: sqlConfig.init,
      cache: process.env.NODE_ENV === 'production',
      entities: ['src/entity/*{.js,.ts}'],
    });
  },
};

export async function close() {
  const connection = getConnection();
  await connection.close();
}
