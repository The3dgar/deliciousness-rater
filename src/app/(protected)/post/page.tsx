import PostForm from '@/components/post/form';

export default async function Post() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <PostForm />
    </div>
  );
}
