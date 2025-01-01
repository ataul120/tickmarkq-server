import mongoose from 'mongoose';
const { Schema } = mongoose;

// Opinion Schema
const opinionSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        opinion: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 500
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

// Create the Opinion model
const Opinion = mongoose.model('Opinion', opinionSchema);

export default Opinion;
