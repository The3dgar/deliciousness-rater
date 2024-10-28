'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';

import { signUp } from '@/lib/actions/auth/signUp';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SubmitButton } from '../../core/buttons/submitButton';

export default function SignUpForm() {
  const initialState = { message: '', errors: {} };
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <Card className='w-full max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          Sign Up
        </CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              required
            />
            {state.errors?.email && (
              <p className='text-sm text-red-500'>{state.errors.email[0]}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='alias'>Alias</Label>
            <Input
              id='alias'
              name='alias'
              type='text'
              placeholder='Choose an alias'
              required
            />
            {state.errors?.alias && (
              <p className='text-sm text-red-500'>{state.errors.alias[0]}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='Create a password'
              required
            />
            {state.errors?.password && (
              <p className='text-sm text-red-500'>{state.errors.password[0]}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='repeatPassword'>Repeat Password</Label>
            <Input
              id='repeatPassword'
              name='repeatPassword'
              type='password'
              placeholder='Repeat your password'
              required
            />
            {state.errors?.repeatPassword && (
              <p className='text-sm text-red-500'>
                {state.errors.repeatPassword[0]}
              </p>
            )}
          </div>
          {state.message && (
            <Alert variant={state.errors ? 'destructive' : 'default'}>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <SubmitButton label='Sign Up' />
          <div className='text-sm text-center'>
            Already have an account?{' '}
            <Link href='/sign-in' className='text-primary hover:underline'>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
