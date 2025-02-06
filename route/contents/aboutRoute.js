import express from "express"
import { createAbout, deleteAbout, getAbout, updateAbout } from "../../controller/contents/aboutController.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";
const router = express.Router();



// Routes
router.post('/', adminAuthGuard, createAbout);
router.get('/', getAbout);
router.put('/:id', adminAuthGuard, updateAbout);
router.delete('/:id', adminAuthGuard, deleteAbout);

export default router;
