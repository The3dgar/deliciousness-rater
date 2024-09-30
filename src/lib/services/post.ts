import PostModel from '../db/schemas/post';

interface Post {
  imageUrl: string;
  name: string;
}

export class PostService {
  async createPost(post: Post) {
    const newPost = await PostModel.create(post);
    return newPost;
  }

  async getPost() {
    const posts = await PostModel.find().lean();
    return posts;
  }
}
