import connectDb from '../db';
import UserModel from '../db/schemas/user';
import { User } from '../interfaces/user';

interface UserCreate {
  alias: string;
  email: string;
  password: string;
}
export class UserService {
  async create(data: UserCreate) {
    await connectDb();
    const newDoc = await UserModel.create(data);
    return newDoc;
  }

  async getByEmail(email: string) {
    if (!email) return null;
    await connectDb();
    const doc = await UserModel.findOne({ email });
    return doc as User;
  }

  async getById(id: string) {
    if (!id) return null;
    await connectDb();
    const doc = await UserModel.findById(id, { password: 0 });
    return doc as User;
  }
}
