import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined. Please set it in .env file");
}

if (!MONGODB_DB) {
  throw new Error("MONGODB_DB is not defined. Please set it in .env file");
}

// Global variable to store the MongoDB connection across hot reloads in development

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return { client, db: client.db(MONGODB_DB) };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
