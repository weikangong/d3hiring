import { getCustomRepository } from 'typeorm';
import type { Server, Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';
import TeacherRepository from '../../repository/teacher';

const register = async (server: Server) => {
  server.route({
    method: 'GET',
    path: '/api/commonstudents',
    handler: async (request: Request, h: ResponseToolkit): Promise<any> => {
      try {
        const { teacher } = request.query as { teacher: string[] };
        console.log('teacher', teacher, typeof teacher);
        const commonStudents = await getCustomRepository(TeacherRepository).retrieveCommonStudents(typeof teacher === 'string' ? [teacher] : teacher);
        return h.response({ students: commonStudents }).code(200);
      } catch (err) {
        return h.response({
          message: err.msg,
          code: err.code,
        }).code(err.code);
      }
    },
    options: {
      validate: {
        query: Joi.object({
          teacher: [Joi.string().required(), Joi.array().items(Joi.string()).required()],
        }),
      },
    },
  });
};

export default { register };
