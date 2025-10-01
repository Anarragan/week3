import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/mydatabase";

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});
export const mongoClient = mongoose;