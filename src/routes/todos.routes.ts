import express from "express";
import { Todos } from "../models/todos.model";
import { authMiddleware } from "../middlewares/auth.middleware";
import { todoCreate, todoDelete, todosList, todoUpdate } from "../controllers/todos.controller";

const router = express.Router();

// 所有 todos 接口都需要登录(中间件带上token)
router.use(authMiddleware);



// 获取所有 todos
router.get("/", todosList);
// 创建 todo
router.post("/", todoCreate);
// 更新 todo
router.put("/:id", todoUpdate);
// 删除 todo
router.delete("/:id", todoDelete);



export default router;
