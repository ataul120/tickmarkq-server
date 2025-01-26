
import Course from "../../model/admin/adminCourseModel.js";


// Create a new course (ok admin )
const createCourse = async (req, res) => {
    try {
        // Check if a course with the same title (case-insensitive) already exists
        const existingCourse = await Course.findOne({
            title: { $regex: `^${req.body.title}$`, $options: 'i' }
        });

        if (existingCourse) {
            return res.status(400).json({
                message: 'A course with this title already exists. Please choose a different title.'
            });
        }

        // Create and save the new course
        const course = new Course(req.body);
        const savedCourse = await course.save();

        res.status(201).json({
            message: 'Course created successfully',
            course: savedCourse
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating course',
            error: error.message
        });
    }
};




// Get all courses (ok admin / user)
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 })
            .populate("questions")
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};




// Get a single course by ID
const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id).populate("questions");
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};


// get course by Link (Category - such as /BCS)
const getCourseByCategory = async (req, res) => {
    const { item } = req.query;
    if (!item) {
        return res.status(400).json({ message: 'Query parameter "item" is required' });
    }

    try {
        const lowerCaseItem = item.toLowerCase();

        const courses = await Course.find({
            category: { $regex: new RegExp(`^${lowerCaseItem}$`, 'i') }, // Case-insensitive match
        });

        // If no courses found, send a message 
        if (courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for this category' });
        }

        res.status(200).json(courses);
    } catch (error) {
        // console.log("categiry", error)
        res.status(500).json({ message: 'Error fetching course', error });
    }
};




// Update a course by ID
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({
            message: 'Course updated successfully',
            course
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error updating course', error });
    }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};

// Export all controller functions
export {
    createCourse,
    getAllCourses,
    getCourseById,
    getCourseByCategory,
    updateCourse,
    deleteCourse,
};
