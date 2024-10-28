'use client';
import { useFormState } from 'react-dom';

import { createPost } from '../../lib/actions/post';
import { FileSelector } from './fileSelector';
import { ErrorMessage } from '../core/errorMessage';
import { SubmitButton } from '../core/buttons/submitButton';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function PostForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createPost, initialState);

  return (
    <div className='max-w-md w-full bg-gray-800 rounded-lg shadow-md p-6'>
      <form className='space-y-6' action={dispatch}>
        <FileSelector />

        <div>
          <Label
            htmlFor='name'
            className='block text-sm font-medium text-gray-300'>
            Product name
          </Label>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Super cool product'
            className='mt-1 p-2 rounded block w-full bg-gray-700 border-2 border-gray-600 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm'
          />
        </div>
        <div>
          <Label
            htmlFor='name'
            className='block text-sm font-medium text-gray-300'>
            Where country is it from?
          </Label>
          <Input
            id='country'
            name='country'
            type='text'
            placeholder='Chile'
            className='mt-1 p-2 rounded block w-full bg-gray-700 border-2 border-gray-600 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea id='description' placeholder='Enter a description' />
        </div>
        <SubmitButton label='Post it!' />

        <ErrorMessage state={state} />
      </form>
    </div>
  );
}
