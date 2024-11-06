/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Props {
  images: ImagePreview[];
  handleRemoveImage: (index: number) => void;
}

interface ImagePreview {
  file: File;
  preview: string;
}

export const ImagePreview = ({ images, handleRemoveImage }: Props) => {
  return (
    <div>
      {images.length > 0 ? (
        <div className='mt-6 grid grid-cols-2 gap-4'>
          {images.map((image, index) => (
            <div key={index} className='relative p-1 border'>
              <img
                src={image.preview}
                alt={`Preview ${index + 1}`}
                className='w-full h-32 object-cover rounded-md'
              />
              <Button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='absolute top-1 right-1 bg-gray-800 w-8 h-8 rounded-full p-2 shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800'
                aria-label={`Remove image ${index + 1}`}>
                <X className='w-4 h-4 text-gray-300' />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-6 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
          <div className='space-y-1 text-center'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'>
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p className='text-xs text-gray-500'>Maybe the nutrition facts? or package?</p>
          </div>
        </div>
      )}
    </div>
  );
};
