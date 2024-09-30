import PostForm from '../../components/post/form';

export default function Post() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-lg mb-3'>Postea un producto</h1>
      <PostForm />
    </div>
  );
}
