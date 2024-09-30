'use server';
import bcrypt from 'bcrypt';
import { generateRecoveryToken } from './generateToken';

export async function generateHashedPassword() {
  const password = generateRecoveryToken();
  const hasedPassword = await bcrypt.hash(password, 10);

  return hasedPassword;
}
