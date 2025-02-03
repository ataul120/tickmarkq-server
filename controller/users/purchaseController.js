
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
        if (user.accessCourse) {
            return res.status(400).json({ message: "already purchased a Course!" });
        };

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
        await usersModel.findByIdAndUpdate(userId, {
            accessCourse: courseId, // store purhcase course _id
            paymentStatus: true
        });


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
        const isUser = await usersModel.findById(userId);

        if (!isUser) {
            return res.status(404).json({ message: "You Are not a valid User" });
        };

        if (!isUser.accessCourse || isUser.paymentStatus !== true) {
            return res.status(404).json({ message: "You Have no Course" });
        }

        const getMyCourse = await CourseModel.findOne({ _id: isUser.accessCourse })

        res.status(200).json(getMyCourse);


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



//  use in Profile Settings page
const deleteMyPurchase = async (req, res) => {
    try {
        const { userId } = req; // Middleware থেকে userId পাওয়া যাচ্ছে


        const isUserCourse = await usersModel.findById(userId);

        if (!isUserCourse.accessCourse) {
            return res.status(404).json({
                message: "No purchase found or already deleted!"
            })
        }

        const isDeleted = await usersModel.updateOne(
            { _id: userId },
            { accessCourse: null }
        );

        if (isDeleted.modifiedCount === 0) {
            return res.status(404).json({
                message: "No purchase found or already deleted!",
            });
        }

        res.status(200).json({
            message: "Purchased course deleted successfully!",
        });
    } catch (error) {
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



