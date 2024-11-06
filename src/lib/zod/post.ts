import z, { object, string } from 'zod';

export const createPostSchema = object({
  name: string().min(3, 'name must be at least 3 characters'),
  description: string().min(3, 'description must be at least 3 characters'),
  country: string().min(2, 'country must be specified'),
  // image:
  //   typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(),
  // image: z.any().optional(),
  // image: z.instanceof(FileList).optional(),
  image: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
});
