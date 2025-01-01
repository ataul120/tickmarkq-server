import mongoose from "mongoose";

const blogModelSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        photo: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "accept", "reject"]
        },
        author: {
            type: Object,
            required: [true, "Author is required"],
        }, 
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogModelSchema);

export default Blog;
