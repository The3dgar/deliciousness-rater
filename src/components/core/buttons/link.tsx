import Link from 'next/link';
import React from 'react';

interface Props {
  label: string;
  href: string;
}
export const LinkButton = ({ href, label }: Props) => {
  return (
    <button
      className='
      py-2 px-2 rounded-md transition duration-100 ease-in-out transform
       hover:text-focus hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800
    '>
      <Link href={href}>{label}</Link>
    </button>
  );
};
