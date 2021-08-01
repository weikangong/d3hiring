import Hapi from '@hapi/hapi';
import type { Server } from '@hapi/hapi';
import routes from './routes';
import { Config } from './config';
import plugins from './plugins';

const app = async (config: Config): Promise<Server> => {
  const { host, port } = config;

  // create an instance of hapi
  const server = Hapi.server({ host, port });

  // store the config for later use
  server.app = { config };

  // register plugins
  await plugins.register(server);
  // register routes
  await routes.register(server);

  return server;
};

export default app;
