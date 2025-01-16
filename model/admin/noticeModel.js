import mongoose from "mongoose";

const NoticeBoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    notice: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const NoticeBoardModel = mongoose.model("NoticeBoard", NoticeBoardSchema);

export default NoticeBoardModel;
