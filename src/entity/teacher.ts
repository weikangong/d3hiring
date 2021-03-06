import {
  Unique, Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import Student from './student';
import Notification from './notification';

@Entity()
@Unique(['email'])
export default class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(() => Notification, (notification) => notification.teacher)
  notifications: Notification[];

  @ManyToMany(() => Student, (student) => student.teachers)
  @JoinTable()
  students: Student[];
}
