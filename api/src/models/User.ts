import mongoose, { Document } from "mongoose";

export type UserDocument = Document &{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    }
})

export default mongoose.model<UserDocument>("User", UserSchema);