import { Router } from "express";

import * as controller from "./product.controller.js";
import { auth } from "../../middleware/auth.js";

import fileUpload, { fileValidation } from "../../utils/muilter.js";


const router = Router();

// Routes 
router.post('/',auth(['admin']),fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 5 }
]) , controller.create);


export default router;