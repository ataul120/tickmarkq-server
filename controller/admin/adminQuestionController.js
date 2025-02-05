import CourseModel from "../../model/admin/adminCourseModel.js";
import QuestionModel from "../../model/admin/adminQustionModel.js";

import mongoose from "mongoose";

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

/// user prfile a purchase course er _id er upor vitti kore ai handler theke questions gulo return korbe
const getMyQuestions = async (req, res) => {
    const { courseId } = req.params;

    try {

        const myQuestions = await QuestionModel.find({ courseId });
        res.status(200).json(myQuestions)


    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch question data",
            error: error.message,
        });
    }
}

// Get all free questions
const getAllFreeQuestion = async (req, res) => {
    const { userId } = req;

    try {

        const freeQuestions = await QuestionModel.find({
            questionCategory: { $in: ["free", "FREE" , "Free"] },
            $or: [
                // { attemptedUsers: { $exists: false } },
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



const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = { ...req.body };

        // Clear attemptedUsers if update succeeds
        updatedData.attemptedUsers = [];

        // Find the existing question
        const existingQuestion = await QuestionModel.findById(id);

        if (!existingQuestion) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        // Check if courseId is being updated
        const oldCourseId = existingQuestion.courseId?.toString();
        const newCourseId = updatedData.courseId?.toString();

        // Update the question
        const questionData = await QuestionModel.findByIdAndUpdate(id, updatedData, {
            new: true, // Return updated document
            runValidators: true, // Apply schema validation
        });

        if (!questionData) {
            return res.status(404).json({
                message: "Question not updated successfully",
            });
        }

        // If courseId is updated, update the course models
        if (oldCourseId && oldCourseId !== newCourseId) {
            // Remove from old course
            await CourseModel.updateOne(
                { _id: oldCourseId },
                { $pull: { questions: id } }
            );

            // Add to new course
            await CourseModel.updateOne(
                { _id: newCourseId },
                { $addToSet: { questions: id } }
            );
        }

        return res.status(200).json({
            message: "Question updated successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update Question",
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
    getMyQuestions,
    getAllFreeQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
}