import { getCustomRepository } from 'typeorm';
import type { Server, Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';
import TeacherRepository from '../../repository/teacher';

const register = async (server: Server) => {
  server.route({
    method: 'POST',
    path: '/api/register',
    handler: async (request: Request, h: ResponseToolkit): Promise<any> => {
      try {
        const { teacher, students } = request.payload as { teacher: string; students: string[] };

        await getCustomRepository(TeacherRepository).register(teacher, students);

        return h.response().code(204);
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
          students: Joi.array().items(Joi.string()).required(),
        }),
      },
    },
  });
};

export default { register };
