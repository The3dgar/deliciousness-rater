import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import logger from '../helpers/logs';

const config = async () => {
  cloudinary.config({
    cloud_name: process.env.SERVICE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.SERVICE_CLOUDINARY_API_KEY,
    api_secret: process.env.SERVICE_CLOUDINARY_API_SECRET,
  });
};

export const fileUploadService = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await config();

  try {
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });

    const { secure_url } = response as UploadApiResponse;

    return secure_url;
  } catch (error) {
    logger.error('fileUploadService:', { error });
    throw new Error('fileUploadService:error al subir la imagen');
  }
};
