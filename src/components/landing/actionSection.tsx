import React from 'react';
import { Upload } from 'lucide-react';
import Link from 'next/link';

export const ActionSection = () => {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Share Your Culinary Creation
            </h2>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
              Got a wild food combination? Show it off to the world and let the
              fusion begin!
            </p>
          </div>
          <Link
            className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
            href='/post'>
            <Upload className='mr-2 h-4 w-4' />
            Submit Your Product
          </Link>
        </div>
      </div>
    </section>
  );
};
