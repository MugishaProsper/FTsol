import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export const connectToDatabase = () => {
  try {
    mongoose.connect(process.env.mongo_url)
  } catch (error) {
    console.log(error.message);
  }
}