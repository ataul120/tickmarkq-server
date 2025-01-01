// ===================================================================== 2 start

// import Course from "../../model/admin/adminCourseModel.js";
// import usersModel from "../../model/users/usersModel.js";

/// user purchase the course  - verify the token , course id set the Database if user.course and course.access userdId

//  <==========   backup hisebe rakha holo =======>
// const purchaseCourse = async (req, res) => {
//     try {
//         const { userId } = req; // User ID from auth middleware
//         const { courseId } = req.body; // Course ID from request body

//         // Run both queries concurrently
//         const [user, course] = await Promise.all([
//             usersModel.findById(userId),
//             Course.findById(courseId)
//         ]);

//         if (!course) {
//             return res.status(404).json({
//                 message: "Course Not Found!"
//             });
//         }

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the user has already purchased a course
//         if (user.course) {
//             return res.status(400).json({ message: "Already Purchased a Course" });
//         }

//         // Update user's course field
//         await usersModel.findByIdAndUpdate(userId, { $set: { course: course._id } });

//         // Add user ID to course access array (multiple users can buy the same course)
//         await Course.findByIdAndUpdate(courseId, { $push: { access: user._id } });

//         res.status(201).json({ message: "Purchase successful" });

//     } catch (error) {
//         res.status(400).json({
//             message: 'Error Purchasing the Course',
//             error: error.message
//         });
//     }
// };



// Fetch courses purchased by a specific user
//  <====== backup hisebe rakha holo ==========>
// const getUserCourses = async (req, res) => {
//     try {
//         const { userId } = req;

//         // Find a single course where the userId is in the 'access' field
//         const course = await Course.findOne({ access: userId }).populate('questions');


//         if (!course) {
//             return res.status(404).json({ message: "No courses found for this user" });
//         }

//         res.status(200).json(course);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };



// ===================================================================== 2 end

// import Purchase from "../../model/purchaseModel.js";
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
        const existingPurchase = await purchaseModel.findOne({ userId, courseId });
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
        const course = await CourseModel.findOne({ _id: purchase.courseId, access: userId }).populate("questions");

        if (!course) {
            return res.status(404).json({ message: "Course not found or access denied" });
        }

        res.status(200).json( course);


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// <======== user er purchase course o payment history ==========>
const getCousePaymentHistory = async(req , res)=>{
     try {
        const {userId} = req;
        const userPayment = await purchaseModel.findOne({userId}).populate("courseId");
        
        if (!userPayment) {
             res.status(404).json({
                message :"You have No Purchase!",
             })
        }

        res.status(200).json(userPayment)

     } catch (error) {
          res.status(500).json({
            message :"Payment History Fetching Problem"
          })
     }
}


export { purchaseCourse, getUserCourses , getCousePaymentHistory }


////!SECTION  

      // Fetch all purchases by the user 
        // const purchases = await purchaseModel.find({ userId }).populate({
        //     path: 'courseId',
        //     select: 'title description questions',
        //     populate: { path: 'questions' }
        // });

        // if (!purchases.length) {
        //     return res.status(404).json({ message: "No courses found for this user" });
        // }

        // const user = await purchaseModel.findOne({ userId: userId });
        // console.log(user)

        // const [user, course] = await Promise.all([
        //     purchaseModel.findOne({ userId: userId }),
        //     CourseModel.findOne({ access: userId }).populate("questions")
        // ]);
        // console.log(user, course)
        // // res.status(200).json(purchases);



////FIXME - 