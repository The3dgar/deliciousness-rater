import type { NextAuthConfig } from 'next-auth';

const authPages = ['/sign-in', '/sign-up'];
const protectedPages = ['/profile', '/post'];

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnAuthPage = authPages.includes(nextUrl.pathname);

      if (isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL('/', nextUrl));
      }

      const isOnProtectedPage = protectedPages.includes(nextUrl.pathname);

      if (!isLoggedIn && isOnProtectedPage) {
        return Response.redirect(
          new URL(`/sign-in?redirect=${nextUrl.pathname}`, nextUrl)
        );
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
