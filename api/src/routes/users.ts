import { Router } from "express";
import passport from "passport";

import { createUserController, loginWithPasswordController, displayUserInformationController, updateUserByIdController } from "../controllers/users";

const router = Router();

router.post("/register", createUserController);

router.post("/login", loginWithPasswordController);

router.get("/:id", passport.authenticate("jwt", {session: false}), displayUserInformationController);

router.put("/:id", passport.authenticate("jwt", {session: false}), updateUserByIdController);

export default router;