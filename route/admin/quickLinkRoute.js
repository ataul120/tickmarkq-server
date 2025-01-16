import express from "express";
import { createQuickLink, deleteLink, getLinks, updateLink } from "../../controller/admin/quickLinkController.js";

const router = express.Router();

router.post("/create", createQuickLink);
router.get("/get", getLinks);
router.put("/update/:id", updateLink);
router.delete("/delete/:id", deleteLink);


export default router