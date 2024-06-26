var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { jsonSecret } from '../config/index.js';
import User from '../database/models/user.js';
export const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decoded = jwt.verify(token, jsonSecret);
        console.log("decode", decoded);
        if (typeof decoded !== "string") {
            const user = yield User.findById(decoded.id);
            if ((user === null || user === void 0 ? void 0 : user.loginToken) === token) {
                req.user = { id: user._id };
                next();
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
        }
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
});
