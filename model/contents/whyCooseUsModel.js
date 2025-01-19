import mongoose from "mongoose";

const WhyChooseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
});


const WhyModel = mongoose.model("WhyChoose", WhyChooseSchema);

export default WhyModel;