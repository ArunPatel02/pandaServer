var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../database/models/user.js';
import bcrypt from 'bcrypt';
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const findUser = yield User.findOne({ email: data.email });
        if (findUser) {
            return res.status(200).json({
                success: false,
                message: "User Already registered please log in"
            });
        }
        const userCreated = yield User.create(data);
        if (userCreated) {
            const token = userCreated.generateToken();
            res.status(200).json({
                success: true,
                message: "User Created Successfully",
                body: {
                    userData: userCreated,
                    token: token
                }
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getUser = yield User.findOne({ email: email });
        if (getUser) {
            const matchPassword = yield bcrypt.compare(password, getUser === null || getUser === void 0 ? void 0 : getUser.password);
            if (matchPassword) {
                const token = getUser.generateToken();
                res.status(200).json({
                    success: true,
                    message: "User Login Successfully",
                    body: {
                        userData: getUser,
                        token: token
                    }
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "Incorrect Password",
                });
            }
        }
        else {
            res.status(200).json({
                success: false,
                message: "email id is not register",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
export const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userLogOut = yield User.findByIdAndUpdate(id, { loginToken: "" });
        res.status(200).json({
            success: true,
            message: "User Logout Successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (id) {
            const user = yield User.findById(id, { password: false });
            res.status(200).json({
                success: true,
                message: "User Fetched",
                body: {
                    userData: user
                }
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something Went Wrong",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
