import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
    content: {type: String, required: true},
    completed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
});

export const Todos = mongoose.model("Todos", todosSchema);
