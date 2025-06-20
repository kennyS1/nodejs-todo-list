import { Request, Response } from "express";
import { Todos } from "../models/todos.model";

// ✅ 获取当前用户的所有 Todo
export const todosList = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any).id; // ✅ 从 token 中获取用户ID
        const todos = await Todos.find({ user: userId });
        res.json(todos);
    } catch (e) {
        res.status(500).json({ message: e });
        console.log(`查询 todos 出错`);
    }
};

// ✅ 创建 Todo（绑定用户）
export const todoCreate = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any).id;
        const todo = new Todos({
            content: req.body.content,
            completed: req.body.completed || false,
            user: userId, // ✅ 添加 user 字段
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (e) {
        res.status(500).json({ message: e });
        console.log(`新增 todos 失败`);
    }
};

// ✅ 更新 Todo（只允许当前用户操作自己的 todo）
export const todoUpdate = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any).id;
        const updated = await Todos.findOneAndUpdate(
            { _id: req.params.id, user: userId }, // ✅ 加入 user 条件
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Todo not found or unauthorized" });
        res.json(updated);
    } catch (e) {
        res.status(500).json({ message: e });
        console.log(`更新 todos 出错`);
    }
};

// ✅ 删除 Todo（只允许当前用户删除自己的 todo）
export const todoDelete = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any).id;
        const deleted = await Todos.findOneAndDelete({ _id: req.params.id, user: userId }); // ✅ 限制 user
        if (!deleted) return res.status(404).json({ message: "Todo not found or unauthorized" });
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ message: e });
        console.log('删除 todo 错误');
    }
};
