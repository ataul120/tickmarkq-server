import mongoose from "mongoose";

// Define the book schema
const bookSchema = new mongoose.Schema({
    coverPhoto: {
        type: String,
        required: true,  
    },
    bookName: {
        type: String,
        required: true,   
        trim: true,   
    },
    title: {
        type: String,
        required: true,  
        trim: true,   
    },
    bookLink: {
        type: String,
        required: true,  
        trim: true,   
    },
}, { timestamps: true });  

// Create the model
const Book = mongoose.model('Book', bookSchema);

export default Book
