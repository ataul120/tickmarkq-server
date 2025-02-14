import adminAuthModel from "../../model/admin/adminAuthModel.js";
import Blog from "../../model/users/blogModel.js";
import usersModel from "../../model/users/usersModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;


// Create a new blog for user
export const createBlog = async (req, res) => {
    try {
        const { userId } = req;

        const user = await usersModel.findById(userId).select("-password");
        const author = {
            userId: user._id,
            name: user.name,
            role: user.role
        }
        const { title, description, photo } = req.body;

        const newBlog = new Blog({ title, description, photo, author: author });
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Failed to create blog", error: error.message });
    }
};

/// create blog for admin and modaretor with authenticated

export const createAdminBlog = async (req, res) => {
    try {
        const { adminId } = req;

        const admin = await adminAuthModel.findById(adminId).select("-password");

        const author = {
            adminId: admin._id,
            name: admin.username,
            role: admin.role
        }
        const { title, description, photo } = req.body;

        const newBlog = new Blog({ title, description, photo, status: "accept", author: author });
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Failed to create blog", error: error.message });
    }
};

export const getAdminBlogById = async (req, res) => {
    try {
        const { adminId } = req;
        const convertUserId = new ObjectId(adminId);

        const blogs = await Blog.find({
            $or: [
                { "author.role": "admin" },
                { "author.role": "moderator" }
            ]
        })
            .sort({ createdAt: -1 });

        if (blogs && blogs.length <= 0) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blog", error: error.message });
    }
};


// Update a blog by admin
export const updateBlogByAdmin = async (req, res) => {
    try {

        const { id } = req.params;
        const { author, ...updateFields } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update blog", error: error.message });
    }
};



// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            // .populate("user", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
    }
};


// <======== Get a single blog by ID (login users blog)  =========>
export const getuserBlogById = async (req, res) => {
    try {
        const { userId } = req;
        // <==== const convertUserId = new ObjectId(userId);  =======>  never use at a time
        const convertUserId = new ObjectId(userId);
        const blogs = await Blog.find({ "author.userId": convertUserId })
            .sort({ createdAt: -1 });

        if (blogs && blogs.length <= 0) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blog", error: error.message });
    }
};




// Update a blog
export const updateBlog = async (req, res) => {
    try {

        const { id } = req.params;
        const { author, ...updateFields } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update blog", error: error.message });
    }
};


/// status blog status update for admin 

export const updateBlogStatusAdmin = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { status } = req.body;

        // Validate input
        if (!blogId || !status) {
            return res.status(400).json({
                message: "Blog ID or Status is missing!"
            });
        }

        // Find the blog
        const isBlog = await Blog.findById(blogId);

        if (!isBlog) {
            return res.status(404).json({
                message: "Blog Not Found!"
            });
        }

        // Update status
        isBlog.status = status;
        await isBlog.save();

        res.status(200).json({
            message: "Status Updated"
        });
    } catch (error) {
        res.status(500).json({
            message: "Blog Status Update Failed!",
            error: error.message
        });
    }
};



// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete blog", error: error.message });
    }
};
