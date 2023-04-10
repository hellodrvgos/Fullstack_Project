import mongoose, { Document } from "mongoose";

export type ProductDocument = Document &{
    pet: string;
    name: string;
    category: string;
    brand: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    quantity: number;
}

export const ProductSchema = new mongoose.Schema({
    pet: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
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
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

export default mongoose.model<ProductDocument>("Product", ProductSchema);