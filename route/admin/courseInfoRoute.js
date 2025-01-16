import express from "express";
import { createCourseInfo, deleteCourseInfo, getCourseInfo, updateCourseInfo } from "../../controller/admin/courseInfoController.js";

const router = express.Router();

router.post("/create", createCourseInfo)
router.get("/get", getCourseInfo)
router.put("/update/:id", updateCourseInfo)
router.delete("/delete/:id", deleteCourseInfo)

export default router;
