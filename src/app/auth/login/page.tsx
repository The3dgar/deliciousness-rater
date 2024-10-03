import { LoginForm } from '@/components/auth/loginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingresar',
};

export default function LoginPage() {
  return (
    <main className='flex items-center justify-center h-screen px-4'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 '>
        <LoginForm />
      </div>
    </main>
  );
}
