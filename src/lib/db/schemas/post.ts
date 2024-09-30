import mongoose from 'mongoose';

interface Post extends mongoose.Document {
  name: string;
  imageUrl: string;
  active: boolean;
}

const schema = new mongoose.Schema<Post>({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  
});

schema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const PostModels = mongoose.models.Post || mongoose.model<Post>('Post', schema);

export default PostModels;
