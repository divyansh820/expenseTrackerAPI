import mongoose from "mongoose";

let cachedPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return await cachedPromise;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is not defined in environment variables");
    throw new Error("MONGO_URI environment variable is missing");
  }

  const opts = {
    serverSelectionTimeoutMS: 10000,
  };

  cachedPromise = mongoose
    .connect(mongoUri, opts)
    .then((mongooseInstance) => {
      console.log("MongoDB Connected Successfully");
      return mongooseInstance;
    })
    .catch((err) => {
      cachedPromise = null;
      console.error("MongoDB Connection Error:", err);
      throw err;
    });

  return await cachedPromise;
};

