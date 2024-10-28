import { Button } from '@/components/ui/button';
import { signOut } from '../../../../auth';
import { LogOut } from 'lucide-react';

export const SignOut = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}>
      <Button variant='ghost' size='icon' aria-label='Sign out'>
        <LogOut className='h-[1.2rem] w-[1.2rem]' />
      </Button>
    </form>
  );
};
