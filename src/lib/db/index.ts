'use server';
import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

const DB_MONGO_CONNECTION_URL = process.env.DB_MONGO_CONNECTION_URL!;

if (!DB_MONGO_CONNECTION_URL) {
  throw new Error(
    'Please define the DB_MONGO_CONNECTION_URL environment variable inside .env'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(DB_MONGO_CONNECTION_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cached.conn = (await cached.promise) as unknown as mongoose.Connection;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDb;
