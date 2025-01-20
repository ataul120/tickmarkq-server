import CourseInfoModel from "../../model/admin/courseInfoModel.js";

// Create a new photo description
export const createCourseInfo = async (req, res) => {
    try {
        const { photo, title, description, categorie, btnText } = req.body;


        if (!title || !description || !categorie || !btnText || !photo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newInfo = new CourseInfoModel({ title, description, categorie, btnText, photo });
        await newInfo.save();

        res.status(201).json({ message: " created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
};

// Get all photo descriptions
export const getCourseInfo = async (req, res) => {
    try {
        const photoDescriptions = await CourseInfoModel.find();
        res.status(200).json(photoDescriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching", error });
    }
};

// Update a photo description by ID
export const updateCourseInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;

        const updated = await CourseInfoModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "not found" });
        }

        res.status(200).json({ message: "updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating", error });
    }
};

// Delete a photo description by ID
export const deleteCourseInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const isDeleted = await CourseInfoModel.findByIdAndDelete(id);

        if (!isDeleted) {
            return res.status(404).json({ message: "not found" });
        }

        res.status(200).json({ message: " deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting", error });
    }
};
