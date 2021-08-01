import {
  Repository, getConnection, getCustomRepository, EntityRepository,
} from 'typeorm';
import { isEmail } from 'class-validator';
import Teacher from '../entity/teacher';
import Student from '../entity/student';
import StudentRepository from './student';
import ApiError from '../routes/ApiError';

@EntityRepository(Teacher)
export default class TeacherRepository extends Repository<Teacher> {
  async register(teacher: string, students: string[]) {
    if (!teacher || !isEmail(teacher)) {
      throw new ApiError(`Teacher email ${teacher} is not a valid email`, 400);
    }

    for (const student of students) {
      if (!student || !isEmail(student)) {
        throw new ApiError(`Student email ${student} is not a valid email`, 400);
      }
    }

    let existingTeacher = await this.findOne({ email: teacher });

    if (!existingTeacher) {
      existingTeacher = this.create();
      existingTeacher.email = teacher;
      await this.save(existingTeacher);
    }

    const connection = getConnection();

    existingTeacher.students = [];

    if (students.length > 0) {
      const studentsToSave = [];
      const existingStudents = await getCustomRepository(StudentRepository)
        .find({ where: students.map((s) => ({ email: s })) });

      for (const student of students) {
        const exists = existingStudents.find((existing) => existing.email === student);

        if (exists) {
          existingTeacher.students.push(exists);
        } else {
          const newStudent = new Student();
          newStudent.email = student;
          studentsToSave.push(newStudent);
          existingTeacher.students.push(newStudent);
        }
      }
      await connection.manager.save(studentsToSave);
      await this.save(existingTeacher);
    }
  }

  async retrieveTeachers(teachers: string[]) {
    teachers.forEach((email) => {
      if (!email || !isEmail(email)) {
        throw new ApiError(`Teacher email ${email} is not a valid email`, 400);
      }
    });
    return this.find({ where: teachers.map((email) => ({ email })), relations: ['students'] });
  }

  async retrieveCommonStudents(teachers: string[]) {
    const uniqTeachers = [...new Set(teachers)];

    const retrievedTeachers = await this.retrieveTeachers(uniqTeachers);

    if (retrievedTeachers.length !== uniqTeachers.length) return [];
    const map = {}; // key = student id, val = student

    retrievedTeachers[0].students.forEach((s: Student) => { map[s.id] = s; });

    if (teachers.length === 1) return Object.values(map).map((s: Student) => s.email);

    for (let i = 1; i < retrievedTeachers.length; i++) {
      const set = new Set();

      retrievedTeachers[i].students.forEach((s: Student) => {
        if (map[s.id.toString()]) set.add(s.id.toString());
      });

      Object.keys(map).forEach((id: string) => {
        if (!set.has(id.toString())) { delete map[id]; }
      });
    }

    return Object.values(map).map((s: Student) => s.email);
  }
}
