import QuestionModel from "../../model/admin/adminQustionModel.js";
import ResultModel from "../../model/admin/resultModel.js"
import usersModel from "../../model/users/usersModel.js";

const submitQuestionAndMakeResult = async (req, res) => {
    const { userId } = req;
    try {
        const {
            questionId, // just find question and update his isSubmit Field
            courseId,
            questionCategory,
            questionTitle,
            questions,
            rightAnswers,
            wrongAnswers,
            totalMark,
            atATime
        } = req.body;

        //  <========== check Queation for Update IsSubmited Field  ================>
        const [question] = await Promise.all([
            QuestionModel.findById(questionId)
        ])

        // <======== Question Paper Check Here =========>
        if (!question) {
            return res.status(404).json({
                message: "Question not Exist!"
            });
        }


        // <========= Check if a submission already exists for the user, course, and title ========>  
        if (question.attemptedUsers.includes(userId)) {
            return res.status(400).json({ message: "You have already attempted this question." });
        }


        const newResult = new ResultModel({
            user: userId,
            courseId,
            questionCategory,
            questionTitle,
            questions,
            rightAnswers,
            wrongAnswers,
            totalMark,
            atATime
        });

        const result = await newResult.save();
        await usersModel.findByIdAndUpdate(userId, { $push: { results: result._id } });
        await QuestionModel.findByIdAndUpdate(questionId, { $push: { attemptedUsers: userId } });


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
            .sort({ createdAt: -1 });

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