import mongoose from 'mongoose';

interface User extends mongoose.Document {
  alias: string;
  email: string;
  password: string;
  active: boolean;
}

const schema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  password: {
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

const UserModels = mongoose.models.User || mongoose.model<User>('User', schema);

export default UserModels;
