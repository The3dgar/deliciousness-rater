import { ActionSection } from '@/components/landing/actionSection';
import { PostImage } from '@/components/landing/postImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostService } from '@/lib/services/post';
import { Search } from 'lucide-react';

export default async function HomePage() {
  const latestPost = await new PostService().getLatest();

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Welcome to Deliciousness Rater
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                  Discover and share product variations from around the world.
                  From Chilean Oreos to Japanese KitKats, explore how flavors
                  change across borders!
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1'
                    placeholder='Search dishes...'
                    type='search'
                  />
                  <Button type='submit' variant='outline'>
                    <Search className='h-4 w-4' />
                    <span className='sr-only'>Search</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
              Latest Products
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {latestPost.map((post) => (
                <PostImage key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
        <ActionSection />
      </main>
    </div>
  );
}
