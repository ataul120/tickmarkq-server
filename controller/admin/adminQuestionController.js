import CourseModel from "../../model/admin/adminCourseModel.js";
import QuestionModel from "../../model/admin/adminQustionModel.js";

const createQuestion = async (req, res) => {
    try {
        const { questionCategory, questionTitle, courseId, examDate, examTime, examDuration, passMark, questions } = req.body;

        // Validation
        if (!questionCategory || !questionTitle || !courseId || !examDate || !examTime || !passMark || !questions || !examDuration || questions.length === 0) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const course = await CourseModel.findById(courseId);

        // Create new Question Data
        const newQuestionData = new QuestionModel({
            questionCategory,
            questionTitle,
            courseId,
            examDate,
            examTime,
            examDuration,
            passMark,
            questions,
        });

        // Save to database
        const savedQuestion = await newQuestionData.save();

        // Push the new question ID to the course's questions array
        course.questions.push(savedQuestion._id);

        await course.save();

        return res.status(201).json({
            message: "Question added successfully!",
            data: savedQuestion,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to add question data",
            error: error.message,
        });
    }
};


const getAllQuestion = async (req, res) => {
    try {
        const questionData = await QuestionModel.find().sort({ createdAt: - 1 });
        return res.status(200).json(questionData);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch question data",
            error: error.message,
        });
    }
};


// Get all free questions
const getAllFreeQuestion = async (req, res) => {
    const { userId } = req;

    try {

        const freeQuestions = await QuestionModel.find({
            questionCategory: { $in: ["free", "FREE"] },
            $or: [
                { attemptedUsers: { $exists: false } },
                { attemptedUsers: { $nin: [userId] } }
            ]
        });

        if (!freeQuestions || freeQuestions.length === 0) {
            return res.status(404).json({
                message: "No Free Questions Available for You!"
            });
        }

        return res.status(200).json(freeQuestions);

    } catch (error) {
        console.error("Error fetching free questions:", error);
        return res.status(500).json({
            message: "Failed to Fetch Free Questions!"
        });
    }
};


const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const questionData = await QuestionModel.findById(id);

        if (!questionData) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        return res.status(200).json(questionData);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch question data",
            error: error.message,
        });
    }
};

/// use after
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const questionData = await QuestionModel.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Apply schema validation
        });

        if (!questionData) {
            return res.status(404).json({
                message: "Question Paper not found",
            });
        }

        return res.status(200).json({
            message: "Question Paper updated successfully!",
            data: questionData,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to update question Paper",
            error: error.message,
        });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const questionData = await QuestionModel.findByIdAndDelete(id);

        if (!questionData) {
            return res.status(404).json({
                message: "Question Paper not found",
            });
        }

        return res.status(200).json({
            message: "Question Paper deleted successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete question Paper",
            error: error.message,
        });
    }
};

export {
    createQuestion,
    getAllQuestion,
    getAllFreeQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
}