import { Repository, EntityRepository } from 'typeorm';
import { isEmail } from 'class-validator';
import Student from '../entity/student';
import ApiError from '../routes/ApiError';

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {
  async suspendStudent(student: string) {
    if (!student || !isEmail(student)) {
      throw new ApiError('Student {studen} is not a valid email', 400);
    }
    const existingStudent = await this.findOne({ email: student });
    if (existingStudent) {
      existingStudent.suspended = true;
      await this.save(existingStudent);
    }
  }

  async saveStudents(students: string[]) {
    const existingStudents = await this.find({ where: students.map((email) => ({ email })) });
    const toSave: Student[] = [];
    students
      .filter((email) => {
        const student = existingStudents.find((s) => s.email === email);
        if (student) return !student.suspended;
        return true;
      })
      .filter((email) => !existingStudents.map((student) => student.email).includes(email))
      .forEach((email) => {
        const newStudent = this.create();
        newStudent.email = email;
        toSave.push(newStudent);
      });
    await this.save(toSave);

    return [...existingStudents, ...toSave];
  }
}
