import NoticeBoardModel from "../../model/admin/noticeModel.js";


// Create a new notice
export const createNotice = async (req, res) => {
    try {
        const { title, notice } = req.body;

        if (!title || !notice) {
            return res.status(400).json({ message: "Title and Notice are required" });
        }

        const newNotice = new NoticeBoardModel({ title, notice });
        await newNotice.save();

        res.status(201).json({ message: "Notice created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating notice", error });
    }
};

// Get all notices
export const getNotices = async (req, res) => {
    try {
        const notices = await NoticeBoardModel.find();
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notices", error });
    }
};

// Update a notice by ID
export const updateNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const notice = req.file ? req.file.path : null;

        const updatedData = {};
        if (title) updatedData.title = title;
        if (notice) updatedData.notice = notice;

        const updatedNotice = await NoticeBoardModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true } // To return the updated document
        );

        if (!updatedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }

        res.status(200).json({ message: "Notice updated successfully", updatedNotice });
    } catch (error) {
        res.status(500).json({ message: "Error updating notice", error });
    }
};

// Delete a notice by ID
export const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNotice = await NoticeBoardModel.findByIdAndDelete(id);

        if (!deletedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }

        res.status(200).json({ message: "Notice deleted successfully", deletedNotice });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notice", error });
    }
};
