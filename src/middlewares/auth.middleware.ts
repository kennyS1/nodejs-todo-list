import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload;
        }
    }
}

const SECRET_KEY = process.env.JWT_SECRET; // 用环境变量更安全

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!SECRET_KEY) {
        return res.status(500).json({ message: "Server misconfigured: JWT secret not set." });
    }
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // 可选：将用户信息附加到请求对象上
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
