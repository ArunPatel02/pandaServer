import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jsonSecret } from '../config/index.js';
import User from '../database/models/user.js';


export interface SecureRequest extends Request {
    user?: {
        id: mongoose.Types.ObjectId
    }
}

export const validateUser = async (req: SecureRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, jsonSecret as string)
        console.log("decode" , decoded)
        if (typeof decoded !== "string") {
            const user = await User.findById(decoded.id)
            if (user?.loginToken === token) {
                req.user = { id: user._id }
                next()
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

}