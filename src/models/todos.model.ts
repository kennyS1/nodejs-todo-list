// models/Todos.ts
import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  // 👇 添加 user 字段，引用 User 模型
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export const Todos = mongoose.model("Todos", todosSchema);
