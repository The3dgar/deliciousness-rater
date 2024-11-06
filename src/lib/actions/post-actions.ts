'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createPostSchema } from '../zod';
import logger from '../helpers/logs';
import { fileUploadService } from '../services/fileUpload';
import { PostService } from '../services/post';

export const createPostAction = async (
  { country, description, name }: z.infer<typeof createPostSchema>,
  formData: FormData
) => {
  try {
    const image = formData.get('image') as File;
    if (!image || !image.size) {
      logger.error('createPostAction', { error: 'No image selected', name });
      throw 'Problem with the image';
    }

    const imageUrl = await fileUploadService(image);
    await new PostService().create({ imageUrl, country, description, name });
  } catch (error) {
    logger.error('createPostAction', { error });

    return {
      error: typeof error == 'string' ? error : 'Error creating the post',
    };
  }

  revalidatePath('/');
  redirect('/');
};
