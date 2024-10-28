import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Donut } from 'lucide-react';
import { ToggleTheme } from './buttons/toggleTheme';
import { getAuthSession } from '@/lib/helpers/getAuthSession';
import { SignOut } from './buttons/sign-out';

export default async function Header() {
  const user = await getAuthSession();

  return (
    <header className='px-4 lg:px-6 h-14 flex items-center'>
      <Link className='flex items-center justify-center' href='/'>
        <Donut className='h-6 w-6 mr-2' />
        <span className='font-bold'>Deliciousness Rater</span>
      </Link>
      <nav className='ml-auto flex items-center gap-4 sm:gap-6'>
        <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          href='#'>
          Explore
        </Link>
        <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          href='/post'>
          Submit
        </Link>
        <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          href='#'>
          About
        </Link>

        {!!user ? (
          <SignOut />
        ) : (
          <>
            <Button variant='outline' size='sm' className=''>
              <Link className='text-sm font-medium' href='/sign-up'>
                Sign Up
              </Link>
            </Button>

            <Link className='text-sm font-medium' href='/sign-in'>
              Sign In
            </Link>
          </>
        )}
        <ToggleTheme />
      </nav>
    </header>
  );
}
