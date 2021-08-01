import { getCustomRepository } from 'typeorm';
import type { Server, Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';
import NotificationRepository from '../../repository/notification';

const register = async (server: Server) => {
  server.route({
    method: 'POST',
    path: '/api/retrievefornotifications',
    handler: async (request: Request, h: ResponseToolkit): Promise<any> => {
      try {
        const { teacher, notification } = request.payload as
        { teacher: string, notification: string };

        const recipents = await
        getCustomRepository(NotificationRepository).retrieveRecipents(teacher, notification);

        return h.response(recipents).code(200);
      } catch (err) {
        return h.response({
          message: err.msg,
          code: err.code,
        }).code(err.code);
      }
    },
    options: {
      validate: {
        payload: Joi.object({
          teacher: Joi.string().required(),
          notification: Joi.string().required(),
        }),
      },
    },
  });
};

export default { register };
