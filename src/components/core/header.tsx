import Link from 'next/link';
import { Donut } from 'lucide-react';
import { LinkButton, LoginButton } from './buttons';

export default function Header() {
  return (
    <header className='bg-[#172439] text-white p-4'>
      <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center'>
        <div className='flex items-center mb-4 sm:mb-0 hover:text-focus'>
          <Donut size={48} className='mr-2' />
          <Link href='/' className='text-2xl font-bold '>
            D Rater
          </Link>
        </div>
        <nav className='flex flex-col sm:flex-row items-center gap-4'>
          <ul className='flex flex-wrap justify-center gap-2 sm:gap-4'>
            <li>
              <LinkButton href='/' label='Home' />
            </li>
            <li>
              <LinkButton href='/about' label='About' />
            </li>
            <li>
              <LinkButton href='/services' label='Services' />
            </li>
            <li>
              <LinkButton href='/contact' label='Contact' />
            </li>
          </ul>
          <LoginButton href='/auth/login' label='Ingresar' />
        </nav>
      </div>
    </header>
  );
}
