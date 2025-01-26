import express from "express"
import { createAbout, deleteAbout, getAbout, updateAbout } from "../../controller/contents/aboutController.js";
const router = express.Router();



// Routes
router.post('/create', createAbout);
router.get('/get', getAbout);
router.put('/update', updateAbout);
router.delete('/delete', deleteAbout);

export default router;
