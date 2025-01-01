// courseModel.js

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true
    },
    books: {
        type: [String],
        default: []
    },
    duration: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
        required: true
    },
    note: {
        type: [String],
        required: false
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    access: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
