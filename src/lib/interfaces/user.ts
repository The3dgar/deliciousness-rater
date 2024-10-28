export interface User {
  _id: string;
  name: string;
  alias: string;
  password: string;
  email: string;

  active: boolean;
  createdAt: string;
}
