import mongoose, { Document } from "mongoose";

export type ProductDocument = Document &{
    name: string;
    category: string;
    price: number;
    description: string;
    image: string
}

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userQuantity: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    }
})

export default mongoose.model<ProductDocument>("Product", ProductSchema);