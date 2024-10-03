import UserModel from '../db/schemas/user';

interface User {
  alias: string;
  email: string;
  password: string;
}

export class UserService {
  async create(data: User) {
    const newDoc = await UserModel.create(data);
    return newDoc;
  }

  async getByEmail(email: string) {
    if (!email) return null;
    const doc = await UserModel.findOne({ email });
    return doc;
  }

  async getById(id: string) {
    if (!id) return null;
    const doc = await UserModel.findById(id);
    return doc;
  }
}
