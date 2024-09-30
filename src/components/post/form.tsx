'use client';
import { useFormState } from 'react-dom';

import { createPost } from '../../lib/actions/post';
import { FileSelector } from './fileSelector';
import { ErrorMessage } from '../core/errorMessage';

export default function PostForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createPost, initialState);

  return (
    <div className='max-w-md w-full mx-auto bg-gray-800 rounded-lg shadow-md p-6'>
      <form className='space-y-6' action={dispatch}>
        <FileSelector />

        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-300'>
            Nombre
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Ingresa el nombre del producto'
            className='mt-1 p-2 rounded block w-full bg-gray-700 border-2 border-gray-600 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium transition duration-200 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800'>
          Postear
        </button>

        <ErrorMessage state={state} />
      </form>
    </div>
  );
}
