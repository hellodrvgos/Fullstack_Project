import User, { UserDocument } from "../models/User";

const createUser = async (
    user: UserDocument
): Promise<UserDocument> => {
    return user.save();
}

const findUserByEmail = async (
    email: string
): Promise<UserDocument | null> => {
    const foundUser = User.findOne({ email: email});
    return foundUser;
}

const findUserById = async (
    id: string
): Promise<UserDocument | null> => {
    const foundUser = User.findOne({_id: id});
    return foundUser;
}

const updateUserInfoById = async (
    userId: string, update: Partial<UserDocument>
): Promise<UserDocument | null> => {
    return User.findByIdAndUpdate(userId, update, {new: true});
}

export default { createUser, findUserByEmail, findUserById, updateUserInfoById };