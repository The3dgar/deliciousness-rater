import { CircleAlert } from 'lucide-react';

interface ErrorMessageProps {
  state: { message?: string | null | undefined };
}

export const ErrorMessage = ({ state }: ErrorMessageProps) => {
  return (
    <div
      className='flex h-8 items-center space-x-1'
      aria-live='polite'
      aria-atomic='true'>
      {state.message && (
        <>
          <CircleAlert className='w-4 h-4 text-red-500' />
          <p className='text-sm text-red-500'>{state.message}</p>
        </>
      )}
    </div>
  );
};
