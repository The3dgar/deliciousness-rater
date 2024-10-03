import connectDb from '@/lib/db';
import { UserService } from '@/lib/services/user';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true;
      // const isLoggedIn = !!auth?.user;
      // const disabledRoute = '/auth/disabled'

      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // const isOnDisabled = nextUrl.pathname.startsWith(disabledRoute);

      // if (isOnDisabled && !auth) {
      //   return Response.redirect(new URL('/auth/login', nextUrl));
      // }

      // if (isOnDashboard) {
      //   if (!isLoggedIn) {
      //     return false; // Redirect unauthenticated users to login page
      //   }

      //   if (!auth?.user?.active) {
      //     return Response.redirect(new URL(disabledRoute, nextUrl));
      //   }

      //   const baseDashboardPage = nextUrl.pathname
      //     .split('/')
      //     .slice(0, 3)
      //     .join('/');

      //   if (baseDashboardPage in PAGES_VALID_ROLE) {
      //     if (!PAGES_VALID_ROLE[baseDashboardPage].includes(auth.user.role)) {
      //       return Response.redirect(new URL('/dashboard', nextUrl));
      //     }
      //   }

      //   return true;
      // } else if (isLoggedIn) {
      //   if (isOnDisabled && !auth.user.active) {
      //     return true;
      //   }
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      // return true;
    },
    async jwt(params) {
      params.token.user_id = params.token.sub;

      if (params.user) {
        const user = params.user as { id: string; last_name: string; role: string; company_id: string; active: boolean };
        params.token = {
          ...params.token,
          last_name: user.last_name,
          role: user.role,
          active: user.active,
          company_id: user.company_id,
          id: user.id,
        };
      }
      return params.token;
    },
    async session({ session, token, user }) {
      //revisar como no hacer esto
      await connectDb()
      session.user;
      const userDB = await new UserService().getById(token?.sub as string);
      if (session.user) {
        session.user = {
          ...session.user,
          active: !!userDB?.active,
          id: (token as User).id,
        };
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
