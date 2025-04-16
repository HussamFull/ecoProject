import { Router } from "express";
import * as controller from "./auth.controller.js";
const router = Router();


router.post('/register', controller.register);
router.get('/confirmEmail/:token', controller.confirmEmail);
//router.post("/login", controller.loginUser);

export default router;