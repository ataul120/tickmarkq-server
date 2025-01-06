import express from 'express';
import { createQuestion, deleteQuestion, getAllFreeQuestion, getAllQuestion, getQuestionById, updateQuestion } from '../../controller/admin/adminQuestionController.js';
const router = express.Router();

// Routes
router.post('/add', createQuestion); // ok
router.get('/all', getAllQuestion);  // ok (admin) due for user
router.get('/free/all', getAllFreeQuestion);  //  
router.get('/details/:id', getQuestionById); // ok
router.put('/update/:id', updateQuestion);
router.delete('/delete/:id', deleteQuestion);  // ok 

export default router;