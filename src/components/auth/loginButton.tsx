'use client';
import { useFormStatus } from 'react-dom';

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium transition duration-200 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800'
      aria-disabled={pending}
      disabled={pending}>
      {pending ? '...' : 'Sign In'}
    </button>
  );
}
