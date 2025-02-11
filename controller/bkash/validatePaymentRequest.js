import Course from "../../model/admin/adminCourseModel.js"
import usersModel from "../../model/users/usersModel.js"


export const validatePaymentRequest = async (userId, courseId, amount) => {


    const [isUser, isCource] = await Promise.all([
        usersModel.findById(userId),
        Course.findById(courseId),
    ]);

    if (!isUser) {
        return { success: false, message: "ব্যবহারকারী পাওয়া যায়নি!" };
    };

    if (isUser.accessCourse) {
        return { success: false, message: "আপনি ইতিমধ্যে একটি কোর্স কিনেছেন।" };
    };

    if (!isCource) {
        return { success: false, message: "কোর্স পাওয়া যায়নি!" };
    };

    if (amount <= 0) {
        return { success: false, message: "অকার্যকর অর্থের পরিমাণ!" };
    }
    return { success: true, user: isUser, course: isCource };
}