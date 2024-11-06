'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signInSchema } from '../zod/auth';
import { signIn } from '../../../auth';
import logger from '../helpers/logs';

export const loginAction = async (
  values: z.infer<typeof signInSchema>,
  redirectUrl = '/'
) => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    logger.error('loginAction', { error });

    return {
      error: 'Error signing in',
    };
  }

  revalidatePath(redirectUrl);
  redirect(redirectUrl);
};
