'use client';

import { authenticate } from '@/lib/actions/auth';
import { Donut, CircleAlert } from 'lucide-react';
import { useFormState } from 'react-dom';
import { LoginButton } from './loginButton';

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='w-full max-w-md p-8 rounded-lg shadow-lg border border-white'>
        <div className='flex items-center justify-center mb-4 sm:mb-0'>
          <Donut size={48} />
        </div>
        <h2 className='text-2xl font-bold mb-6 text-white text-center mt-4'>
          Welcome back!
        </h2>
        <form className='space-y-6' action={dispatch}>
          <div className='space-y-2'>
            <label htmlFor='email' className='text-white'>
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='Enter your email'
              required
              className='mt-1 p-2 rounded block w-full bg-gray-700 border-2 border-gray-600 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm'
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='password' className='text-white'>
              Password
            </label>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='Enter your password'
              required
              className='mt-1 p-2 rounded block w-full bg-gray-700 border-2 border-gray-600 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm'
            />
          </div>
          {/* <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium transition duration-200 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800'>
            Sign In
          </button> */}
          <LoginButton />

          <div
            className='flex h-8 items-end space-x-1'
            aria-live='polite'
            aria-atomic='true'>
            {errorMessage && (
              <>
                <CircleAlert className='h-5 w-5 text-red-500' />
                <p className='text-sm text-red-500'>{errorMessage}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
