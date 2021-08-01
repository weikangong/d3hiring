import { Repository, getCustomRepository, EntityRepository } from 'typeorm';
import { isEmail } from 'class-validator';
import TeacherRepository from './teacher';
import StudentRepository from './student';
import Student from '../entity/student';
import Notification from '../entity/notification';
import { parseStudentEmailMentions } from '../utils/student';
import ApiError from '../routes/ApiError';

@EntityRepository(Notification)
export default class NotificationRepository extends Repository<Notification> {
  async retrieveRecipents(teacher: string, message: string) {
    if (!teacher || !isEmail(teacher)) {
      throw new ApiError(`Teacher email ${teacher} is not a valid email`, 400);
    }
    if (!message) {
      throw new ApiError('Empty notification', 400);
    }

    const mentionedStudents = parseStudentEmailMentions(message);
    const existingTeacher = (await
    getCustomRepository(TeacherRepository).retrieveTeachers([teacher]))[0];

    const notification = this.create();
    notification.message = message;

    if (existingTeacher) {
      notification.teacher = existingTeacher;
    } else {
      throw new ApiError('Teacher does not exist', 400);
    }

    const studentsToNotify = new Set();
    existingTeacher.students
      .filter((s: Student) => !s.suspended)
      .forEach((s: Student) => studentsToNotify.add(s));

    const savedStudents = await
    getCustomRepository(StudentRepository).saveStudents(mentionedStudents);
    savedStudents
      .filter((student: Student) => !student.suspended)
      .forEach((student: Student) => {
        studentsToNotify.add(student);
      });

    notification.students = [...studentsToNotify] as Student[];

    await this.save(notification);

    return {
      recipients: [...studentsToNotify].map((s: Student) => s.email),
    };
  }
}
