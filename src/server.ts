import dotenv from 'dotenv';
dotenv.config(); // ✅ 必须在最前，加载 .env

import express from 'express';
import { connectDB } from './config/db'; // 引入连接函数
import authRoutes from "./routes/auth.routes"; // ✅ 正确

const app = express();
app.use(express.json());
app.use("/", authRoutes);

connectDB(); // ✅ 在读取 .env 后再连接

app.listen(process.env.PORT || 5000, () => {
  console.log(` Server running on port ${process.env.PORT || 5000}`);
});
