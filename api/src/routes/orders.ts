import { Router } from "express";
import { createOrderController, getAllOrdersByUserIdController } from "../controllers/orders";
import passport from "passport";

const router = Router();

router.post("/:id", passport.authenticate("jwt", {session: false}), createOrderController);

router.get("/:id", passport.authenticate("jwt", {session: false}), getAllOrdersByUserIdController);

export default router;