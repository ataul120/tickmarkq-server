import mongoose from "mongoose";

const CourseInfoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    btnText: {
        type: String,
        required: true,
    },
    photo: {
        type: String, // Store the photo URL or file path
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CourseInfoModel = mongoose.model("CourseInfo", CourseInfoSchema);

export default CourseInfoModel;
