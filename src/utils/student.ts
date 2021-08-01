import { isEmail } from 'class-validator';

export function parseStudentEmailMentions(mentions: string): string[] {
  const pattern = /[@]+[A-Za-z0-9_.@]+/g;
  return mentions
    .match(pattern)
    .map((email: string) => email.substring(1))
    .filter((email: string) => isEmail(email));
}
