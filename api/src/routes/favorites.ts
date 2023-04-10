import { Router } from "express";
import { createFavoritesController, getAllFavoritesByUserIdController } from "../controllers/favorites";
import passport from "passport";

const router = Router();

router.post("/:id", passport.authenticate("jwt", {session: false}), createFavoritesController);

router.get("/:id", passport.authenticate("jwt", {session: false}), getAllFavoritesByUserIdController);

export default router;