'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { createPostSchema } from '@/lib/zod';
import { useImageSelector } from '@/lib/hooks/useImageSelector';
import { ImagePreview } from './imagePreview';
import { CountryInput } from '../core/inputs/countryInput';
import { createPostAction } from '@/lib/actions/post-actions';

export default function CreatePostForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const { images, handleImageChange, handleRemoveImage } = useImageSelector();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      name: '',
      country: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    const { country, description, name, image } = values;
    const formData = new FormData();
    
    image.forEach((img) => {
      formData.append('image', img);
    });

    setError('');
    startTransition(async () => {
      const response = await createPostAction(
        { country, description, name, image: [] },
        formData
      );
      if (response?.error) {
        setError(response.error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='image'
          render={() => (
            <FormItem>
              <FormLabel
                htmlFor='image'
                className='cursor-pointer border rounded-md py-2 px-3 bg-primary  text-primary-foreground'>
                Choose files
              </FormLabel>
              <FormControl>
                <Input
                  id='image'
                  type='file'
                  accept='image/*'
                  multiple
                  className='sr-only'
                  onChange={(e) =>
                    handleImageChange(e, form as unknown as UseFormReturn)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImagePreview images={images} handleRemoveImage={handleRemoveImage} />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Sweet banana split...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Sweet like...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where you buyed it?</FormLabel>
              <FormControl>
                <CountryInput
                  defaultValue={field.value}
                  onChange={(value: string) => form.setValue('country', value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button type='submit' className='w-full'>
          {isPending ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
