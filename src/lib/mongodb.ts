import mongoose, { Mongoose } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/candidate-db';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cachedClient: Mongoose | null = null;
let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await mongoose.connect(MONGO_URI);
  const db = client.connection;

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
