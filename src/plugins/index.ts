import type { Server } from '@hapi/hapi';
import database from './database';

const register = async (server: Server) => {
  // register plugins
  await database.register(server);
};

export default { register };
