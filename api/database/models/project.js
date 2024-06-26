import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    discription: {
        type: String,
    },
    addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
}, { timestamps: true });
const Product = mongoose.model("product", ProductSchema);
export default Product;
