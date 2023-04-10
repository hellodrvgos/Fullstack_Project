import Favorite, {FavoriteDocument} from "../models/Favorite";

const createFavorites = async (
    favorites: FavoriteDocument
): Promise<FavoriteDocument> => {
    return favorites.save();
}

const getAllFavoritesByUserId = async (
    userIdRequest: string,
): Promise<FavoriteDocument[]> => {
    return Favorite.find({userId: userIdRequest}).populate("favorites")

}

export default { createFavorites, getAllFavoritesByUserId };