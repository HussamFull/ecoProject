import { Router } from "express";
import * as controller from "./category.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

// Routes 
router.post('/',auth(['admin']), controller.create);
router.get('/',auth(['admin']), controller.get);
router.get('/:id', controller.details);
router.get('/active', controller.getActive);
router.put('/:id',auth(['admin']), controller.update);
router.delete('/:id',auth(['admin']), controller.remove);

export default router;