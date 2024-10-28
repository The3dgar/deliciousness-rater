'use server';
import bcrypt from 'bcrypt';

export async function generateHashedPassword(password: string) {
  const hasedPassword = await bcrypt.hash(password, 10);

  return hasedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  return passwordsMatch;
}
