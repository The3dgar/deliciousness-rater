'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { fileUploadService } from '../services/fileUpload';
import { PostService } from '../services/post';
import logger from '../helpers/logs';
import connectDb from '../db';

const PostSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  active: z.string(),
});

const createSchema = PostSchema.omit({ id: true, active: true });

export type State = {
  errors?: {
    name?: string[];
    active?: string[];
    image?: string[];
  };
  message?: string;
};

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = createSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes, no se pudo crear el post',
    };
  }

  const image = formData.get('image') as File;

  if (!image || !image.size) {
    return {
      errors: { image: ['No se ha seleccionado una imagen'] },
      message: 'No se ha seleccionado una imagen',
    };
  }

  try {
    const imageUrl = await fileUploadService(image);

    const { name } = validatedFields.data;

    await connectDb();

    await new PostService().createPost({ imageUrl, name });
  } catch (error) {
    logger.error('createPostAction', { error });
    return {
      message: 'Error al subir la imagen',
    };
  }

  revalidatePath('/');
  redirect('/');
}
