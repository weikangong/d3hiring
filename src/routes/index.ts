import type { Server } from '@hapi/hapi';

import registerStudents from './api/register';
import commonStudents from './api/commonStudents';
import suspend from './api/suspend';
import retrieveNotifications from './api/retrieveNotifications';

const register = async (server: Server) => {
  // register api routes
  await registerStudents.register(server);
  await commonStudents.register(server);
  await suspend.register(server);
  await retrieveNotifications.register(server);

  server.route({
    method: 'GET',
    path: '/',
    handler: async () => 'Server running!',
  });
};

export default { register };
