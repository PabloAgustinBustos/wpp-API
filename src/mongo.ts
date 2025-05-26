import mongoose from "mongoose";

export default async function connectToMongoDB() {
  await mongoose.connect(
    "mongodb+srv://mongoUser:mongoPass@forlearning.4g9vzfn.mongodb.net/?retryWrites=true&w=majority&appName=ForLearning", 
    {
      dbName: "WPP"
    }
  )
}