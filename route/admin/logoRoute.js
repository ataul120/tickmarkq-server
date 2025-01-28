
import express from "express";
import { deleteLogo, getLogo, PostLogo } from "../../controller/admin/logoController.js";
const router = express.Router();

router.post("/create", PostLogo)
router.get("/get", getLogo)
router.delete("/delete/:logoId", deleteLogo)

export default router;