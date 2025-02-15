import mongoose from "mongoose";

const freeResourceskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});


const FreeResourceModel = mongoose.model("FreeResourse", freeResourceskSchema);

export default FreeResourceModel;