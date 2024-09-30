import Link from 'next/link';
interface Props {
  label: string;
  href: string;
}
export const LoginButton = ({ label, href }: Props) => {
  return (
    <Link
      className='bg-indigo-600 text-white py-2 px-4 rounded-md font-medium transition duration-200 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800'
      href={href}>
      {label}
    </Link>
  );
};
