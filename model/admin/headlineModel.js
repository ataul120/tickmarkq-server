import mongoose from "mongoose";

const HeadlineSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const HeadlineModel = mongoose.model("headline", HeadlineSchema);

export default HeadlineModel;