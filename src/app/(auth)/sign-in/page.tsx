import { Metadata } from 'next';
import SignInForm from '@/components/auth/signIn/signInForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Page() {
  return (
    <main className='flex items-center justify-center h-screen px-4'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 '>
        <Card className='w-full max-w-sm mx-auto'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>
              Welcome back!
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <SignInForm />
          </CardContent>
        </Card>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-sm text-center'>
            Create an account?{' '}
            <Link href='/sign-up' className='text-primary hover:underline'>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </div>
    </main>
  );
}
