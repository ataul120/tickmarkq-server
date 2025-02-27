
import express from "express"
import { createSecretKey, updateSecreteKey, verifySecreteKey } from "../../controller/admin/adminSecretController.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";

const router = express.Router();

router.post("/create", adminAuthGuard, createSecretKey);
router.post("/match", verifySecreteKey);
router.put("/update", adminAuthGuard, updateSecreteKey);

export default router;