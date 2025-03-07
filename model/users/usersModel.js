import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailPhone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    collage: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    paymentStatus: { type: Boolean, default: false },
    accessCourse:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
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
