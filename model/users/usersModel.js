import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailPhone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "" },
    collage: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    isPayment: { type: Boolean, default: false },
    // course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    purchases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Purchase'
        }
    ],
    results: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Result"

        }],
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Blog"

        }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
