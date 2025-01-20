import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { Post } from '@/lib/interfaces/post';

interface Props {
  post: Post;
}

export const PostImage = ({ post: { imageUrl, name, _id } }: Props) => {
  return (
    <div className='relative group'>
      <Image
        alt={name}
        className='object-cover w-full h-60 rounded-lg'
        height='240'
        src={imageUrl}
        style={{
          aspectRatio: '360/240',
          objectFit: 'cover',
        }}
        width='360'
      />
      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg'>
        <Link className='text-white font-semibold' href={`/${_id}`}>
          {name}
        </Link>
        {/* <p className='text-white font-semibold'>{name}</p> */}
      </div>
      <Button
        className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
        size='icon'
        variant='secondary'>
        <Heart className='h-4 w-4' />
        <span className='sr-only'>Like</span>
      </Button>
    </div>
  );
};
