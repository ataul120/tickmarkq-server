import jwt from 'jsonwebtoken'; // require এর বদলে import
import bcrypt from 'bcryptjs';
import usersModel from '../../model/users/usersModel.js';
import Course from '../../model/admin/adminCourseModel.js';


// Create User
export const createUser = async (req, res) => {
    try {
        const { name, emailPhone, password, photo, collage, address, paymentStatus } = req.body;

        // Check if user already exists with the same email
        const existingUser = await usersModel.findOne({ emailPhone });
        if (existingUser) {
            return res.status(400).json({ message: "already registered" });
        }

        // Password hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new usersModel({
            name,
            emailPhone,
            password: hashedPassword,  // Store the hashed password 
            photo,
            collage,
            address,
            paymentStatus: false,
        });

        const savedUser = await await newUser.save();
        // Create JWT token
        const token = jwt.sign({ userId: savedUser._id }, process.env.TOKEN_SECRET);

        res.status(201).json({ message: "Register successfully", token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Login User
export const loginUser = async (req, res) => {
    try {
        const { emailPhone, password } = req.body;

        const user = await usersModel.findOne({ emailPhone });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User by id (logged in user) only for user all populate fields
export const getUser = async (req, res) => {
    const { userId } = req;
    try {
        const user = await usersModel.findById(userId)
            .select('-password')
            .populate("purchases")
            .populate("results")
        // .populate({
        //     path: 'purchases', // First populate course
        //     populate: { path: 'questions' } // Then populate questions inside course
        // });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);  // Send user data
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// Get User All (By Admin)
export const getAllUser = async (req, res) => {
    try {
        const user = await usersModel.find()
            .select('-password')
        // .populate({
        //     path: 'course', // First populate course
        //     populate: { path: 'questions' } // Then populate questions inside course
        // });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);  // Send user data
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// Update User
export const updateUser = async (req, res) => {
    try {
        const { userId } = req; // এটি authGuard থেকে আসবে
        const { id } = req.params; // URL থেকে ইউজার ID

        const body = req.body;

        const { paymentStatus, accessCourse, ...updatedBody } = body

        if (userId !== id) {
            return res.status(403).json({ error: "You are not authorized to update this user" });
        }

        const updatedUser = await usersModel.findByIdAndUpdate(id, updatedBody, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Reset the password
export const userResetPassword = async (req, res) => {
    try {
        const { name, emailPhone, password } = req.body;

        // Check if all fields are provided
        if (!name || !emailPhone || !password) {
            return res.status(400).json({
                message: "All fields are required!",
            });
        }

        // Check if the user exists
        const isUser = await usersModel.findOne({ name, emailPhone });
        if (!isUser) {
            return res.status(404).json({
                message: "User not found! Please provide valid credentials.",
            });
        }

        // Password hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update user's password
        isUser.password = hashedPassword;
        await isUser.save();

        return res.status(200).json({
            message: "Password reset successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Password reset failed! Please try again.",
        });
    }
};


// Payment Status and Access the Cource (Only admin manage this);

export const accessTheCourse = async (req, res) => {
    try {
        const { adminId, role } = req;
        const { paymentStatus, accessCourse } = req.body;
        const { userId } = req.params;

        // Ensure paymentStatus is treated as a boolean
        const isPaymentCompleted = paymentStatus === "true";

        const responseMessage = isPaymentCompleted
            ? "User can access the course"
            : "User's course is pending";

        // Check if required fields are provided
        if (paymentStatus === undefined || !accessCourse) {
            return res.status(400).json({
                message: "Payment status and course ID are required!"
            });
        }

        // Check if course exists
        const isCourse = await Course.findById(accessCourse);
        if (!isCourse) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }

        // Only admin can perform this action
        if (!adminId || role !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to give access!"
            });
        }

        // Update user's course access
        const updatedUser = await usersModel.findByIdAndUpdate(
            userId,
            {
                $set: { paymentStatus: isPaymentCompleted, accessCourse }
            },
            { new: true }
        );

        // Check if user update was successful
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        // Send response to the client
        res.status(200).json({
            message: responseMessage, // Dynamic response message
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update course access! Please try again.",
            error: error.message
        });
    }
};




// Delete User
export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {

        const deletedUser = await usersModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

