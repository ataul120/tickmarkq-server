import express from "express";
import { adminLogin, createAdmin, deleteAdmin, getAdminById, getallAdmins, updateAdmin } from "../../controller/admin/adminAuthControler.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";

const router = express.Router();

// Create Admin
router.post("/register", createAdmin); // almost ok

// Admin Login
router.post("/login", adminLogin);  //ok

// get all admins
router.get("/get/all", getallAdmins) //

// get admin by id 
router.get("/get/me", adminAuthGuard, getAdminById) //

// Update Admin
router.put("/update/:id", adminAuthGuard, updateAdmin); //

// Delete Admin
router.delete("/delete/:id", adminAuthGuard, deleteAdmin); //

export default router;
