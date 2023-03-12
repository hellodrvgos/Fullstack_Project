import mongoose, { Document } from "mongoose";
import User from "./User";
import Product from "./Product";

export type OrderDocument = Document &{
    userId: string;
    cart: [];
    orderCreated: Date;
};

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    cart: [
        { 
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
            },
            userQuantity: {
                type: Number,
            }
        }
    ],
    orderCreated: {
        type: Date,
        default: Date.now,
    }
    })

export default mongoose.model<OrderDocument>("Order", OrderSchema);