import mongoose, { Document } from "mongoose";
import { ProductSchema }  from "./Product";
import User from "./User";

export type OrderDocument = Document &{
    userId: string;
    products: [];
    orderCreated: Date;
};

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    products: [
        {type: ProductSchema}
    ],
    orderCreated: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model<OrderDocument>("Order", OrderSchema);