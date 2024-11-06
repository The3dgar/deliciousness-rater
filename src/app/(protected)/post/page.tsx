import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreatePostForm from '@/components/post/createPostForm';

export const metadata: Metadata = {
  title: 'Post',
};

export default function Page() {
  return (
    <main className='flex items-center justify-center h-screen px-4'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 '>
        <Card className='w-full max-w-sm mx-auto'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>
              Post a product ❤️
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <CreatePostForm />
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <div className='text-sm text-center'>
              <span>Dont miss your description and country 👌</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
