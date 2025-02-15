import express from "express";
import { createResourse, deleteResourse, getResourse, updateResourse } from "../../controller/admin/freeResourseController.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";


const router = express.Router();

router.post("/create", adminAuthGuard, createResourse);
router.get("/get", getResourse);
router.put("/update/:id", adminAuthGuard, updateResourse);
router.delete("/delete/:id", adminAuthGuard, deleteResourse);


export default router