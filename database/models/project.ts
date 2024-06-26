import mongoose, { Schema, mongo } from 'mongoose'

interface productInterface {
    name: string,
    quantity: number,
    discription: string,
    addedBy: mongoose.Types.ObjectId
}


const ProductSchema = new Schema<productInterface>({
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

}, { timestamps: true })


const Product = mongoose.model<productInterface>("product", ProductSchema)

export default Product