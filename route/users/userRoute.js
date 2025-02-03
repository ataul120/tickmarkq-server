import express from 'express';
import { accessTheCourse, createUser, deleteUser, getAllUser, getUser, loginUser, updateUser, userResetPassword } from '../../controller/users/usersController.js';
import authGuard from '../../midlewere/authGuard.js';
import adminAuthGuard from '../../midlewere/adminAuthGurad.js';


const router = express.Router();

// Register user
router.post("/register", createUser); /// ok 

// User login
router.post("/login", loginUser);  // ok

// Get user by token (logged-in user)
router.get("/me", authGuard, getUser); // ok

// Get All user by admin 
router.get("/all", getAllUser);  /// ok

// Update user by ID
router.put("/update/:id", authGuard, updateUser);

// reset password
router.post("/reset", userResetPassword);


// give access to the course (only admin);
router.put("/access/:userId", adminAuthGuard, accessTheCourse)

// Delete user by ID
router.delete("/delete/:id", adminAuthGuard, deleteUser);

export default router;   
