
import usersModel from "../../model/users/usersModel.js";
import CourseModel from "../../model/admin/adminCourseModel.js";

export const getMyPurchase = async (req, res) => {
    const { userId } = req;
    try {

        const user = await usersModel.findById(userId);

        // console.log(user)

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }


        if (user.accessCourse && !user.paymentStatus) {
            return res.status(400).json({
                message: "আপনার কোর্সটি পেন্ডিং এ আছে , সাপোর্টে যোগাযোগ করুন । "
            })
        }

        if (!user.accessCourse || !user.paymentStatus) {
            return res.status(400).json({
                message: "আপনি এখনো কোনো কোর্স কিনেননি! "
            })
        };

        const getMyCourse = await CourseModel.findOne({ _id: user.accessCourse })

        if (!getMyCourse) {
            return res.status(400).json({
                message: "কোনো কোর্স পাওয়া যায়নি ! "
            })
        };

        res.status(200).json(getMyCourse);


    } catch (error) {
        res.status(500).json({
            message: "Failed to fatch!",
            error: error.message
        })
    }
}

export const deleteMyPurchase = async (req, res) => {

    try {
        const { userId } = req; // Middleware থেকে userId পাওয়া যাচ্ছে

        const isUserCourse = await usersModel.findById(userId);
        if (!isUserCourse.accessCourse) {
            return res.status(404).json({
                message: "কোনো কোর্স কিনেননি বা ডিলিট করেছেন !"
            })
        }
        const isDeleted = await usersModel.updateOne(
            { _id: userId }, // যেই ইউজারের ডাটা আপডেট করবো
            { accessCourse: null } // accessCourse ফিল্ড null করে দিচ্ছি
        );
        if (isDeleted.modifiedCount === 0) {
            return res.status(404).json({
                message: "কোনো কোর্স কিনেননি বা ডিলিট করেছেন !",
            });
        }

        res.status(200).json({
            message: "আপনার কোর্সটি ডিলিট করা হয়েছে।",
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete your course",
            error: error
        })
    }

}