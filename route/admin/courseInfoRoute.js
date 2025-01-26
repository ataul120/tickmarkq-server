import express from "express";
import { createCourseInfo, deleteCourseInfo, getCourseInfo, updateCourseInfo } from "../../controller/admin/courseInfoController.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";

const router = express.Router();

router.post("/create", adminAuthGuard, createCourseInfo)
router.get("/get", getCourseInfo)
router.put("/update/:id", adminAuthGuard, updateCourseInfo)
router.delete("/delete/:id", adminAuthGuard, deleteCourseInfo)

export default router;
