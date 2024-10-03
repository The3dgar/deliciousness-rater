import PostModel from '../db/schemas/post';

interface Post {
  imageUrl: string;
  name: string;
}

export class PostService {
  async create(data: Post) {
    const newDoc = await PostModel.create(data);
    return newDoc;
  }

  async get() {
    const docs = await PostModel.find().lean();
    return docs;
  }
}
