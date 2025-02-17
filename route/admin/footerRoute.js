
import express from "express";
import { getFooter, postFooter, updateFooter } from "../../controller/admin/footerController.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";

const router = express.Router();

router.post("/", adminAuthGuard, postFooter)
router.get("/", getFooter)
router.put("/:id", adminAuthGuard, updateFooter)


export default router;