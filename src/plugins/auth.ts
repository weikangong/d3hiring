import type { Server, Request } from '@hapi/hapi';
import AuthBearer from 'hapi-auth-bearer-token';

export default {
  name: 'authentication',
  register: async (server: Server) => {
    await server.register(AuthBearer);
    // get the sql connection information
    // @ts-expect-error
    const { config } = server.app;
    server.auth.strategy('simple', 'bearer-access-token', {
      allowQueryToken: true, // optional, false by default
      allowCookieToken: true,
      validate: async (request: Request, token: string) => {
        const isValid = token === config.cookiePwd;

        const credentials = { token };
        const artifacts = { test: 'info' };

        return { isValid, credentials, artifacts };
      },
    });

    // set default auth for all routes
    server.auth.default('simple');
  },
  once: true,
};
