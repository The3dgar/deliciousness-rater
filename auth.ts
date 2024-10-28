import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';

import { comparePassword } from '@/lib/helpers/password.helpers';
import { UserService } from '@/lib/services/user';
import { signInSchema } from '@/lib/zod';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt', // this is the default value
  },
  providers: [
    credentials({
      authorize: async (
        credentials: Partial<{ email: string; password: string }>
      ) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await new UserService().getByEmail(email);

        if (!user) {
          throw new Error('Invalid credentials.');
        }

        if (!user.active) {
          throw new Error('User is not active.');
        }

        const passwordsMatch = await comparePassword(password, user.password);
        if (!passwordsMatch) {
          throw new Error('Invalid credentials.');
        }

        return user;
      },
    }),
  ],
});
