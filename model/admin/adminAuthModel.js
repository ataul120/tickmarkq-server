import mongoose from "mongoose";

const adminAuthSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "moderator"],
            default: "admin",
        },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("AdminAuth", adminAuthSchema);
