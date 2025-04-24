import { Router } from "express";
import * as controller from "./coupon.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

// Routes 
router.post('/',auth(['admin']), controller.create);


export default router;