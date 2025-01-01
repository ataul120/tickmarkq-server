import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    questionCategory: {
        type: String,
        required: true
    },
    questionTitle: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    rightAnswers: {
        type: Number,
        required: true
    },
    wrongAnswers: {
        type: Number,
        required: true
    },
    totalMark: {
        type: Number,
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });


const ResultModel = mongoose.model("Result", ResultSchema);

export default ResultModel