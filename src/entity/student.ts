import {
  Unique, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import Teacher from './teacher';
import Notification from './notification';

@Entity()
@Unique(['email'])
export default class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  suspended: boolean = false;

  @ManyToMany(() => Teacher, (teacher) => teacher.students)
  teachers: Teacher[];

  @OneToMany(() => Notification, (notification) => notification.students)
  notifications: Notification[];
}
