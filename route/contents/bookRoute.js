import express from "express"
import { CreateBook, deleteBook, getAllBooks, getBookById, updateBook } from "../../controller/contents/bookController.js";
import adminAuthGuard from "../../midlewere/adminAuthGurad.js";
const router = express.Router();


// Route for creating a book
router.post('/', adminAuthGuard, CreateBook);

// Route for getting all books
router.get('/', getAllBooks);

// Route for getting a single book by ID
router.get('/get-one/:id', getBookById);

// Route for updating a book by ID
router.put('/:id', adminAuthGuard, updateBook);

// Route for deleting a book by ID
router.delete('/:id',adminAuthGuard, deleteBook);

export default router
