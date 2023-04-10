import mongoose, { Document } from "mongoose";
import Product from "./Product";
import User from "./User";

export type FavoriteDocument = Document &{
    userId: string;
    productId: number;
}

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    favorites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
    },
})

export default mongoose.model<FavoriteDocument>("Favorite", FavoriteSchema);