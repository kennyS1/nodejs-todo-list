import { Request, Response } from "express";
import { Todos } from "../models/todos.model";

export const todoDelete = async(req: Request, res: Response) => {
    try {
        await Todos.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch(e) {
        res.status(500).json({message: e})
        console.log('删除todo错了...');
    }
};


export const todoUpdate = async(req: Request, res: Response) => {
    try {
        const updated = await Todos.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch(e) {
        res.status(500).json({message: e});
        console.log('跟新todos错了...');
    }
};

export const todosList = async(req: Request, res: Response) => {
    try {
        const todos = await Todos.find();
        res.json(todos);
    } catch(e) {
        res.status(500).json({message: e});
        console.log(`查询所有todos错误...`)
    } 
};

export const todoCreate = async(req: Request, res: Response) => {
    try {
        const todo = new Todos(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch(e) {
        res.status(500).json({message: e});
        console.log(`新增todos失败...`);
    }
};