import HeadlineModel from "../../model/admin/headlineModel.js";

 
// Create a new headline
export const createHeadline = async (req, res) => {
    try {
        const { headline } = req.body;
        if (!headline) {
            return res.status(400).json({ message: "Headline is required" });
        }

        const newHeadline = new HeadlineModel({ headline });
        await newHeadline.save();

        res.status(201).json({ message: "Headline created successfully", newHeadline });
    } catch (error) {
        res.status(500).json({ message: "Error creating headline", error });
    }
};

// Get all headlines
export const getHeadlines = async (req, res) => {
    try {
        const headlines = await HeadlineModel.find();
        res.status(200).json(headlines);
    } catch (error) {
        res.status(500).json({ message: "Error fetching headlines", error });
    }
};

// Update a headline by ID
export const updateHeadline = async (req, res) => {
    try {
        const { id } = req.params;
        const { headline } = req.body;

        if (!headline) {
            return res.status(400).json({ message: "Headline is required" });
        }

        const updatedHeadline = await HeadlineModel.findByIdAndUpdate(
            id,
            { headline },
            { new: true } // To return the updated document
        );

        if (!updatedHeadline) {
            return res.status(404).json({ message: "Headline not found" });
        }

        res.status(200).json({ message: "Headline updated successfully", updatedHeadline });
    } catch (error) {
        res.status(500).json({ message: "Error updating headline", error });
    }
};

// Delete a headline by ID
export const deleteHeadline = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedHeadline = await HeadlineModel.findByIdAndDelete(id);

        if (!deletedHeadline) {
            return res.status(404).json({ message: "Headline not found" });
        }

        res.status(200).json({ message: "Headline deleted successfully", deletedHeadline });
    } catch (error) {
        res.status(500).json({ message: "Error deleting headline", error });
    }
};
