import express from 'express'
import { createCourse, deleteCourse, getAllCourses, getCourseByCategory, getCourseById,  updateCourse } from '../../controller/admin/adminCourseController.js'; 

const router = express.Router();

router.post('/create', createCourse);  // ok
router.get('/all', getAllCourses);  // ok   
router.get('/:id', getCourseById); // ok
router.get('/categorie/item', getCourseByCategory);  // get by category query ok
router.put('/update/:id', updateCourse); // ok
router.delete('/delete/:id', deleteCourse); // ok

export default router;
