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
    const image = formData.getAll('image') as File[];

    // validate if the image are valid
    image.forEach((img, index) => {
      if (index == 3) {
        throw 'You can only upload 3 images';
      }

      if (!img.size) {
        logger.error('createPostAction', {
          error: 'No image selected',
          name: img.name,
        });
        throw `Problem with the image name: ${img.name}`;
      }

      // validate the image size is less than 2MB
      if (img.size > 5 * 1024 * 1024) {
        logger.error('createPostAction', {
          error: 'Image size is too big',
          name: img.name,
        });
        throw `The image ${img.name} is too big`;
      }
    });

    

    image.forEach((img) => {
      
    });
    

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
