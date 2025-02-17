import mongoose from "mongoose"

const footerSchema = new mongoose.Schema({
    flTitle: {
        type: String,
        required: true
    },
    flText: {
        type: String,
        required: true
    },
    flLink: {
        type: String,
        required: true
    },

    fRTitle: {
        type: String,
        required: true
    },
    fRPhone: {
        type: String,
        required: true
    },
    fREmail: {
        type: String,
        required: true
    },
    fRFacebook: {
        type: String,
        required: true
    },
    fRInstagram: {
        type: String,
        required: true
    },
    fRYoutube: {
        type: String,
        required: true
    },
});

const FooterModel = mongoose.model("footer" , footerSchema);

export default FooterModel;