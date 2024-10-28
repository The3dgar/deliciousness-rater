'use client';
import { useState, ChangeEvent } from 'react';
import { X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
interface ImagePreview {
  file: File;
  preview: string;
}

export const FileSelector = () => {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };
  return (
    <div className='text-black'>
      <div>
        <Label
          htmlFor='image'
          className='block text-sm font-medium text-gray-300'>
          Upload Images
        </Label>
        <div className='mt-1 flex items-center'>
          <Input
            id='image'
            name='image'
            type='file'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='sr-only hidden'
            required
          />
          <label
            htmlFor='image'
            className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800'>
            Elegir archivos
          </label>
        </div>
      </div>

      {images.length > 0 ? (
        <div className='mt-6 grid grid-cols-2 gap-4'>
          {images.map((image, index) => (
            <div key={index} className='relative'>
              <img
                src={image.preview}
                alt={`Preview ${index + 1}`}
                className='w-full h-32 object-cover rounded-md'
              />
              <Button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='absolute top-1 right-1 bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800'
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
            <p className='text-xs text-gray-500'>
              No has seleccionado archivos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
