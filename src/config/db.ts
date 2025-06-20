import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log("⚠️ 实际读取到的 MONGO_URI:", uri);  // ← 关键调试点

  try {
    await mongoose.connect(uri || '');
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
