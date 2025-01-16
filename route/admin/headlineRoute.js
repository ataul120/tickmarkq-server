import express from "express";
import {
    createHeadline,
    getHeadlines,
    updateHeadline,
    deleteHeadline
} from "../../controller/admin/headlineController.js";
 
const router = express.Router();

router.post("/create", createHeadline); // Create a headline
router.get("/get", getHeadlines); // Get all headlines
router.put("/:id", updateHeadline); // Update a headline by ID
router.delete("/:id", deleteHeadline); // Delete a headline by ID

export default router;
