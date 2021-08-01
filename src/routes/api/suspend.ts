import { getCustomRepository } from 'typeorm';
import type { Server, Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';
import StudentRepository from '../../repository/student';

const register = async (server: Server) => {
  server.route({
    method: 'POST',
    path: '/api/suspend',
    handler: async (request: Request, h: ResponseToolkit): Promise<any> => {
      try {
        const { student } = request.payload as { student: string };

        await getCustomRepository(StudentRepository).suspendStudent(student);

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
          student: Joi.string().required(),
        }),
      },
    },
  });
};

export default { register };
