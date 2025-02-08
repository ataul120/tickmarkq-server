import mongoose from "mongoose";

const seoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    icons: { type: String, default: "/logo.png" },
}, { timestamps: true });

const Seo = mongoose.model("Seo", seoSchema);
export default Seo;
