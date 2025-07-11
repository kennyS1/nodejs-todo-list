import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";

//注册
export const register = async(req: Request, res: Response) => {
    //在require中拿到username, password
    const { username, password } = req.body;

    //查重User
    const existingUser = await User.findOne({username});
    if(existingUser) return res.status(400).json({msg: "User already exists"});

    //注册
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword});
    await user.save();
    
    //返回注册user的token
    res.status(201).json({ token: generateToken(user._id.toString()) });
};


//登录
export const login = async(req: Request, res: Response) => {
    const {username, password} = req.body;
    //查找用户是否存在
    const user = await User.findOne({username});
    if(!user) return res.status(400).json({msg: "User not found"});
    //判断密码(明文哈希后)是否正确
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: "Invalid password"});
    //返回登录token
    res.status(200).json({token: generateToken(user._id.toString())});
};