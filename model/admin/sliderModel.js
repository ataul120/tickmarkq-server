
import mongoose from "mongoose"

const sliderSchema = new mongoose.Schema({
    slider: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SliderModel = mongoose.model("slider", sliderSchema);

export default SliderModel;