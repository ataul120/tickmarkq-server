import express from "express";
import { getSeo, PostSeo } from "../../controller/admin/seoController.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";

const router = express.Router();


router.post("/", adminAuthGuard, PostSeo);
router.get("/", getSeo);



export default router;


