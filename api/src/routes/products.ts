import { Router } from "express";
import passport from "passport";

import { createProductController, getAllProductsController, updateProductQuantityController } from "../controllers/products";

const router = Router();

router.post("/", createProductController);

router.get("/", getAllProductsController);

router.put("/:id", passport.authenticate("jwt", {session: false}), updateProductQuantityController);

export default router;