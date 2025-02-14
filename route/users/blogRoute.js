import express from "express";
import { createAdminBlog, createBlog, deleteBlog, getAdminBlogById, getAllBlogs, getuserBlogById, updateBlog, updateBlogByAdmin, updateBlogStatusAdmin } from "../../controller/users/blogControler.js"
import authGuard from "../../midlewere/authGuard.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";

const router = express.Router();


router.post("/blogs", authGuard, createBlog); /// ok for user
router.get("/blogs", getAllBlogs);  // the route for admin (public) ok 
router.get("/blog/me", authGuard, getuserBlogById); // ok

router.post("/blogs/admin", adminAuthGuard, createAdminBlog); ///  for admin ok 
router.put("/blogs/admin/:id", adminAuthGuard, updateBlogByAdmin); ///  for admin  
router.get("/blogs/admin/me", adminAuthGuard, getAdminBlogById); //  

// router.put("/blogs/:id", authGuard, updateBlog); // next time  
router.put("/blogs/:id", updateBlog); // ok 

router.put("/blog/status/:blogId", updateBlogStatusAdmin) ///  ok 
router.delete("/blogs/:id", deleteBlog); /// ok user

export default router;
