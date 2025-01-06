import CourseModel from "../../model/admin/adminCourseModel.js";
import QuestionModel from "../../model/admin/adminQustionModel.js";

const createQuestion = async (req, res) => {
    try {
        const { questionCategory, questionTitle, courseId, examDate, examTime, examDuration, questions } = req.body;

        // Validation
        if (!questionCategory || !questionTitle || !courseId || !examDate || !examTime || !questions || !examDuration || questions.length === 0) {
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


//  get all free questions
const getAllFreeQuestion = async (req, res) => {
    try {
        const freeQuestions = await QuestionModel.find({ questionCategory: { $in: ["free", "FREE"] } });
        res.status(200).json(freeQuestions);
    } catch (error) {
        res.status(500).json({
            message: "Failed to Fatch!"
        })
    }
}


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
                message: "Question data not found",
            });
        }

        return res.status(200).json({
            message: "Question data updated successfully!",
            data: questionData,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update question data",
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
                message: "Question not found",
            });
        }

        return res.status(200).json({
            message: "Question deleted successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete question",
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