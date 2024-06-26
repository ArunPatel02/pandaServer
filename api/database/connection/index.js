import mongoose from 'mongoose';
import { DB_URL } from '../../config/index.js';
export const connectDB = () => {
    mongoose.connect(DB_URL).then(() => {
        console.log("Db Connected");
    }).catch(() => {
        console.log("Db is not connected");
    });
};
