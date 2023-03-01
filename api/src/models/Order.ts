import mongoose, { Document } from "mongoose";
import { ProductSchema }  from "./Product";
import User from "./User";

export type OrderDocument = Document &{
    userId: string;
    products: [];
    contactInfo: object,
    orderCreated: Date;
};

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    products: [ 
        // {
        //     productOrder: { type: ProductSchema },
        //     userQuantity: { type: Number, required: true }
        // }
        { type: ProductSchema },
    ],
    contactInfo: {
        country: { type: String },
        city: { type: String },
        address: { type: String }
    },
    orderCreated: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model<OrderDocument>("Order", OrderSchema);