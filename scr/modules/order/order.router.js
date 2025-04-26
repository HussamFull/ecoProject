import { Router } from "express";
import * as controller from "./order.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

// Routes 
router.post('/',auth(['user']), controller.create);
router.get('/', auth(['user']), controller.getUserOrders);
router.get('/:status', auth(['admin']), controller.getOrdersByStatus);





export default router;