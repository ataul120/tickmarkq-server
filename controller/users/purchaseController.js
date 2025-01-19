
import usersModel from "../../model/users/usersModel.js";
import CourseModel from "../../model/admin/adminCourseModel.js";
import purchaseModel from "../../model/users/purchaseModel.js";


/// purchase a course
const purchaseCourse = async (req, res) => {
    try {
        const { userId } = req; // User ID from auth middleware
        const { courseId, paymentDetails } = req.body; // Include payment details

        // Validate user and course
        const [user, course] = await Promise.all([
            usersModel.findById(userId),
            CourseModel.findById(courseId)
        ]);

        if (!course) return res.status(404).json({ message: "Course Not Found!" });
        if (!user) return res.status(404).json({ message: "User Not Found!" });

        // Check if the user has already purchased the course
        const existingPurchase = await purchaseModel.findOne({ userId });
        if (existingPurchase) {
            return res.status(400).json({ message: "already purchased a Course!" });
        }

        // Create a new purchase entry
        const purchase = new purchaseModel({
            userId,
            courseId,
            paymentHistory: {
                amount: paymentDetails.amount,
                method: paymentDetails.method,
                bkashNumber: paymentDetails.bkashNumber,
                transactionId: paymentDetails.transactionId,
                status: paymentDetails.status || 'pending'
            }
        });

        // Save the purchase
        const savedPurchase = await purchase.save();

        // Update the user model to include the new purchase ID in the user's purchase field
        await usersModel.findByIdAndUpdate(userId, { $push: { purchases: savedPurchase._id } });

        // Optionally update course access
        await CourseModel.findByIdAndUpdate(courseId, { $push: { access: userId } });

        res.status(201).json({ message: "Purchase successful", purchase: savedPurchase });
    } catch (error) {
        res.status(500).json({ message: "Error Purchasing Course", error: error.message });
    }
};


/// get purchase course and his questions
const getUserCourses = async (req, res) => {
    try {
        const { userId } = req;


        const purchase = await purchaseModel.findOne({ userId: userId });

        if (!purchase) {
            return res.status(404).json({ message: "No purchase found for this user" });
        }

        // Fetch the course and populate questions
        const MyCourse = await CourseModel.findOne({ _id: purchase.courseId, access: userId }).populate("questions");

        if (!MyCourse) {
            return res.status(404).json({ message: "Course not found or access denied" });
        }

        const MyQuestions = MyCourse.questions?.filter(qs => qs.attemptedUsers && !qs.attemptedUsers.includes(userId));

        // <<<<<<< course and his Questions return >>>>>>>>>>>>>
        res.status(200).json({ course: MyCourse, questions: MyQuestions });


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



//  akhono use kora hoyni
const deleteMyPurchase = async (req, res) => {
    try {
        const { userId } = req; // User ID from token/middleware
        const { courseId } = req.params; // Course ID to delete

        // Find the user
        const isUser = await usersModel.findById(userId);

        if (!isUser) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        isUser.purchases = []

        await isUser.save();

        res.status(200).json({
            message: "Purchase deleted successfully!", 
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Delete failed!",
            error: error.message,
        });
    }
};


// <======== user er purchase course o payment history ==========>
const getCousePaymentHistory = async (req, res) => {
    try {
        const { userId } = req;
        const userPayment = await purchaseModel.findOne({ userId }).populate("courseId");

        if (!userPayment) {
            res.status(404).json({
                message: "You have No Purchase!",
            })
        }

        res.status(200).json(userPayment)

    } catch (error) {
        res.status(500).json({
            message: "Payment History Fetching Problem"
        })
    }
}


export { purchaseCourse, getUserCourses, deleteMyPurchase, getCousePaymentHistory }



