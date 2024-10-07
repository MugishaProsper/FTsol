import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectToDB = async () => {
  try {
    mongoose.connect(process.env.mongo_url);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message)
    process.exit(1);
  }
}

export default connectToDB;