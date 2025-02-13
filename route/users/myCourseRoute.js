import express from "express";
import { deleteMyPurchase, getMyPurchase } from "../../controller/users/myPurchaseController.js";
import authGuard from "../../midlewere/authGuard.js";

const router = express.Router();

//  user er purchase kora course get
router.get("/get-purchase", authGuard, getMyPurchase);
router.delete("/delete-purchase", authGuard, deleteMyPurchase);

export default router