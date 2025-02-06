import Book from "../../model/contents/bookModel.js";

// Create a new book
export const CreateBook = async (req, res) => {
    try {
        const { coverPhoto, bookName, title, bookLink } = req.body;

        // Create a new book document
        const newBook = new Book({
            coverPhoto,
            bookName,
            title,
            bookLink
        });

        // Save the book to the database
        const savedBook = await newBook.save();

        res.status(201).json({
            message: "Book Added Succesfull"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// Get a single book by its ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// Update a book by its ID
export const updateBook = async (req, res) => {
    try {
        const { coverPhoto, bookName, title, bookLink } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { coverPhoto, bookName, title, bookLink },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found',
            });
        }

        res.status(200).json({
            message: "Book Updated "
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// Delete a book by its ID
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
