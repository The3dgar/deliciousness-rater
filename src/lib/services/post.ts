import connectDb from '../db';
import PostModel from '../db/schemas/post';
import { Post } from '../interfaces/post';

interface PostCreateData {
  imageUrl: string;
  name: string;
}

export class PostService {
  async create(data: PostCreateData) {
    const newDoc = await PostModel.create(data);
    return newDoc;
  }

  async get() {
    const docs = await PostModel.find().lean();
    return docs;
  }

  async getLatest(limit = 10) {
    await connectDb();
    const docs = await PostModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return docs as Post[];
  }
}
