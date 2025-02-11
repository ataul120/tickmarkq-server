import express from "express";
import { createPayment, paymentCallback } from "../../controller/bkash/bkashController.js";
import authGuard from "../../midlewere/authGuard.js";

const router = express.Router();

router.post("/payment/create", authGuard, createPayment);
router.get("/payment/callback", paymentCallback);


export default router