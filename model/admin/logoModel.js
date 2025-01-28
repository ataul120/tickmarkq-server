
import mongoose from "mongoose";

const LogoShema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },


},
    { timestamps: true }
);

const LogoModel = mongoose.model("logo", LogoShema);

export default LogoModel;