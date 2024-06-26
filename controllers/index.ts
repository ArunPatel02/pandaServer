import { Request, Response } from 'express';
import User from '../database/models/user.js';
import bcrypt from 'bcrypt';
import { SecureRequest } from '../middelware/index.js';

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const findUser = await User.findOne({ email: data.email })
        if (findUser) {
            return res.status(200).json({
                success: false,
                message: "User Already registered please log in"
            })
        }
        const userCreated = await User.create(data)
        if (userCreated) {
            const token = userCreated.generateToken()
            res.status(200).json({
                success: true,
                message: "User Created Successfully",
                body: {
                    userData: userCreated,
                    token: token
                }
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const getUser = await User.findOne({ email: email })
        if (getUser) {
            const matchPassword = await bcrypt.compare(password, getUser?.password as string)
            if (matchPassword) {
                const token = getUser.generateToken()
                res.status(200).json({
                    success: true,
                    message: "User Login Successfully",
                    body: {
                        userData: getUser,
                        token: token
                    }
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: "Incorrect Password",
                })
            }
        } else {
            res.status(200).json({
                success: false,
                message: "email id is not register",
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}

export const logout = async (req: SecureRequest, res: Response) => {
    try {
        const id = req.user?.id
        const userLogOut = await User.findByIdAndUpdate(id, { loginToken: "" })
        res.status(200).json({
            success: true,
            message: "User Logout Successfully",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}

export const getUser = async (req: SecureRequest, res: Response) => {
    try {
        const id = req.user?.id
        if (id) {
            const user = await User.findById(id, { password: false })
            res.status(200).json({
                success: true,
                message: "User Fetched",
                body: {
                    userData: user
                }
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Something Went Wrong",
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}