import mongoose, { Schema, mongo } from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jsonSecret } from '../../config/index.js';

interface userInterface {
    name: string,
    email: string,
    password: string,
    loginToken?: string,
}

interface userModelInterface {
    generateToken(): string
}

type userModel = mongoose.Model<userInterface, {}, userModelInterface>

const UserSchema = new Schema<userInterface>({
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
}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})

UserSchema.methods.generateToken = function () {
    const { _id } = this
    console.log("generating token", _id)
    try {
        const token = jwt.sign({ id: _id }, jsonSecret as string)
        if (token) {
            console.log("token generated")
            this.loginToken = token
            this.save()
            return token
        }
    } catch (error) {
        console.log("error while generating token")
    }
}

const User = mongoose.model<userInterface, userModel>("user", UserSchema)

export default User