import { Router } from "express";

import { signup, login } from "../service/usersService.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
