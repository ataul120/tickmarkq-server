import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'], default: 'pending'
    },
    paymentHistory: { type: Object, default: {} },
    purchasedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Purchase', purchaseSchema);
