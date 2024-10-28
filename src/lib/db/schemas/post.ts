import { models, model, Schema, Document } from 'mongoose';

interface Post extends Document {
  name: string;
  imageUrl: string;
  active: boolean;
}

const schema = new Schema<Post>(
  {
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
  },
  { timestamps: true }
);

schema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...object } = this.toObject();
  object.id = _id;
  return object as Post;
});

const PostModels = models.Post || model<Post>('Post', schema);

export default PostModels;
