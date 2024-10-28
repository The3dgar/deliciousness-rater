import { Metadata } from 'next';
import SignUpForm from '@/components/auth/signUp/signUpForm';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Page() {
  return (
    <main className='flex items-center justify-center h-screen px-4'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 '>
        <SignUpForm />
      </div>
    </main>
  );
}
