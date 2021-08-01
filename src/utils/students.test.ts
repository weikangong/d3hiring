import { parseStudentEmailMentions } from './student';

test('Invalid email mentions', () => {
  const notifications = 'Hello students! @studentagnes @studentmiche';
  const mentionedStudents = parseStudentEmailMentions(notifications);

  expect(mentionedStudents.length).toBe(0);
});

test('1 valid email mention', () => {
  const notifications = 'Hello students! @studentagnes@gmail.com';
  const mentionedStudents = parseStudentEmailMentions(notifications);

  expect(mentionedStudents.length).toBe(1);
});

test('2 valid email mention', () => {
  const notifications = 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com';
  const mentionedStudents = parseStudentEmailMentions(notifications);

  expect(mentionedStudents.length).toBe(2);
});

test('2 valid email mention and 1 invalid email mention', () => {
  const notifications = 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com @ggmail';
  const mentionedStudents = parseStudentEmailMentions(notifications);

  expect(mentionedStudents.length).toBe(2);
});
