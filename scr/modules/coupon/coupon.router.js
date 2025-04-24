import { Router } from "express";
import * as controller from "./coupon.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

// Routes 
router.post('/',auth(['admin']), controller.create);
router.get('/',auth(['admin']) , controller.get);
router.get('/:id',auth(['admin']) , controller.getById);
router.put('/:id',auth(['admin']) , controller.update);
router.delete('/:id',auth(['admin']) , controller.deleteCoupon);


export default router;