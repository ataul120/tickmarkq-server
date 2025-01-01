import ResultModel from "../../model/admin/resultModel.js"
import usersModel from "../../model/users/usersModel.js";

const submitQuestionAndMakeResult = async (req, res) => {
    const { userId } = req;
    try {
        const {
            courseId,
            questionCategory,
            questionTitle,
            questions,
            rightAnswers,
            wrongAnswers,
            totalMark
        } = req.body;

        //  <========== check userAccount  ================>
        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found!"
            });
        }

        // <========= Check if a submission already exists for the user, course, and title ========>  
        // const isExistExam = await ResultModel.findOne({
        //     user: userId,
        //     questionTitle: questionTitle,
        //     isComplete: true
        // });

        // // If the user has already completed the exam for this course and title, do not allow another submission
        // if (isExistExam) {
        //     return res.status(400).json({
        //         message: "You have already completed this exam."
        //     });
        // }

        // <========== If a new question ID is provided, it should be considered a new exam ========>  
        const newResult = new ResultModel({
            user: userId,
            courseId,
            questionCategory,
            questionTitle,
            questions,
            rightAnswers,
            wrongAnswers,
            totalMark,
            isComplete: true
        });

        const result = await newResult.save();
        await usersModel.findByIdAndUpdate(userId, { $push: { results: result._id } });

        res.status(201).json({
            message: "Question submitted successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};



const getAllResults = async (req, res) => {
    try {
        const results = await ResultModel.find()
            .populate("user", "emailPhone name")
            .sort({ createdAt: -1 });
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getMyResult = async (req, res) => {
    const { userId } = req
    try {
        const myResult = await ResultModel.find({ user: userId })

        if (!myResult) {
            res.status(404).json({ message: "Your Result not found!" })
        }
        res.status(200).json(myResult)

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const getResultById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ResultModel.findById(id);

        res.status(200).json(result)


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export { submitQuestionAndMakeResult, getAllResults, getMyResult, getResultById }