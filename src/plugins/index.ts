import type { Server } from '@hapi/hapi';
import database from './database';
import auth from './auth';

const register = async (server: Server) => {
  // register plugins
  await database.register(server);
  await auth.register(server);
};

export default { register };
