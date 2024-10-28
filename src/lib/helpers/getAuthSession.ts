import { auth } from '../../../auth';

interface User {
  id: string;
  email: string;
  name: string;
  active: boolean;
  alias: string;
}

export const getAuthSession = async () => {
  const session = await auth();
  return session?.user as User;
};
