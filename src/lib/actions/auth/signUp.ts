'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { generateHashedPassword } from '@/lib/helpers/password.helpers';
import { UserService } from '@/lib/services/user';
import logger from '@/lib/helpers/logs';

const signUpSchema = z
  .object({
    email: z.string().email(),
    alias: z.string().min(3).max(20),
    password: z.string().min(8),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

type State = {
  errors?: {
    email?: string[];
    alias?: string[];
    password?: string[];
    repeatPassword?: string[];
  };
  message?: string;
};

export async function signUp(prevState: State, formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
    alias: formData.get('alias'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to create account.',
    };
  }

  const { email, alias, password } = validatedFields.data;
  try {
    const userByEmail = await new UserService().getByEmail(email);

    if (userByEmail) {
      return { message: 'Email already in use.' };
    }

    const hasedPassword = await generateHashedPassword(password);
    await new UserService().create({
      email,
      alias,
      password: hasedPassword,
    });
  } catch (error) {
    logger.error({ error });
    return { message: 'Database Error: Failed to create user.' };
  }

  revalidatePath('/sign-in');
  redirect('/sign-in');
}
