import mongoose from "mongoose";

const QuickLinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});


const QuickLinkModel = mongoose.model("Quicklink", QuickLinkSchema);

export default QuickLinkModel;