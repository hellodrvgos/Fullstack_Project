import { Request, Response } from "express";
import Favorite from "../models/Favorite";

import FavoriteServices from "../services/favorites"

export const createFavoritesController = async (
    req: Request,
    res: Response
) => {
    try {
        const newFavorite = new Favorite({
            userId: req.params.id,
            favorites: req.body.favorites,
        })
        const favorite = await FavoriteServices.createFavorites(newFavorite);
        res.json({favorite, message: `Product added to Favorites`});
    } catch (error) {
        console.log(error);
    }
}

export const getAllFavoritesByUserIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const favoritesList = await FavoriteServices.getAllFavoritesByUserId(req.params.id);
        res.json(favoritesList);"fa"
    } catch (error) {
        console.log(error);
    }
}