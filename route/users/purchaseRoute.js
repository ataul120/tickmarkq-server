
import express from "express"
import authGuard from "../../midlewere/authGuard.js";
import { deleteMyPurchase, getCousePaymentHistory, getUserCourses, purchaseCourse } from "../../controller/users/purchaseController.js";

const router = express.Router()


router.post('/purchase', authGuard, purchaseCourse);  //  for user ok
router.get('/get-purchase', authGuard, getUserCourses);  //  for user ok
router.delete('/delete-purchase', authGuard, deleteMyPurchase);  //  for user  
router.get('/get-purchase-payment', authGuard, getCousePaymentHistory);  //  for user ok



export default router