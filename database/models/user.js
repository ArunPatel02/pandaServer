var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jsonSecret } from '../../config/index.js';
const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
    },
    loginToken: {
        type: String,
    }
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            this.password = yield bcrypt.hash(this.password, 10);
            next();
        }
    });
});
UserSchema.methods.generateToken = function () {
    const { _id } = this;
    console.log("generating token", _id);
    try {
        const token = jwt.sign({ id: _id }, jsonSecret);
        if (token) {
            console.log("token generated");
            this.loginToken = token;
            this.save();
            return token;
        }
    }
    catch (error) {
        console.log("error while generating token");
    }
};
const User = mongoose.model("user", UserSchema);
export default User;
