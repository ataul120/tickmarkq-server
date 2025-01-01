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
    paymentHistory: {
        amount: Number,
        method: String, // e.g., 'bkash', 'card'
        bkashNumber: Number,
        transactionId: String,
        status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
        date: { type: Date, default: Date.now }
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Purchase', purchaseSchema);
