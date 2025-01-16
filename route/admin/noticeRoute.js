import express from "express";
import {
    createNotice,
    getNotices,
    updateNotice,
    deleteNotice
} from "../../controller/admin/noticeController.js";

const router = express.Router();


// Routes
router.post("/create", createNotice);
router.get("/get", getNotices);
router.put("/update/:id", updateNotice);
router.delete("/delete/:id", deleteNotice);

export default router;
