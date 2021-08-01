import type { Server } from '@hapi/hapi';

import apis from './api';

const register = async (server: Server) => {
  // register api routes
  apis.forEach(async (api) => api.register(server));

  server.route({
    method: 'GET',
    path: '/',
    handler: async () => 'Server running!',
  });
};

export default { register };
