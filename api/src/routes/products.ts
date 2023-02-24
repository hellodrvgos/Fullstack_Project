import { Router } from "express";

import { createProductController, getAllProductsController } from "../controllers/products";

const router = Router();

router.post("/", createProductController);

router.get("/", getAllProductsController);

export default router;