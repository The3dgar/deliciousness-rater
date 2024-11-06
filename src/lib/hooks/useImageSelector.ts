'use client';
import { useState, ChangeEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface ImagePreview {
  file: File;
  preview: string;
}

export const useImageSelector = () => {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    form: UseFormReturn
  ) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);

      form.setValue(
        'image',
        [...images, ...newImages].map((img) => img.file)
      );
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

  return {
    images,
    handleImageChange,
    handleRemoveImage,
  };
};
