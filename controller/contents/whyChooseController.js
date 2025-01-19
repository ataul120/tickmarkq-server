import WhyModel from "../../model/contents/whyCooseUsModel.js";


// Create a new "Why Choose Us" section
export const createWhyChoose = async (req, res) => {
    try {
        const { title, description, photo } = req.body;

        if (!title || !description || !photo) {
            return res.status(400).json({ message: "All Fields are required." });
        }

        const newWhyChoose = new WhyModel({
            title,
            description,
            photo
        });

        await newWhyChoose.save();
        res.status(201).json({ message: "Why Choose Us section created successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating Why Choose Us section", error });
    }
};

// Get all "Why Choose Us" sections
export const getWhyChooseSections = async (req, res) => {
    try {
        const sections = await WhyModel.find();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Why Choose Us sections", error });
    }
};

// Get a single "Why Choose Us" section by ID
export const getWhyChooseById = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await WhyModel.findById(id);

        if (!section) {
            return res.status(404).json({ message: "Why Choose Us section not found" });
        }

        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Why Choose Us section", error });
    }
};

// Update a "Why Choose Us" section by ID
export const updateWhyChoose = async (req, res) => {
    try {
        const { id } = req.params;
        const { section, mainHeading, subHeading, button, contentCard } = req.body;

        const updatedData = {};
        if (section) updatedData.section = section;
        if (mainHeading) updatedData.mainHeading = mainHeading;
        if (subHeading) updatedData.subHeading = subHeading;
        if (button) updatedData.button = button;
        if (contentCard) updatedData.contentCard = contentCard;

        const updatedSection = await WhyModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedSection) {
            return res.status(404).json({ message: "Why Choose Us section not found" });
        }

        res.status(200).json({ message: "Why Choose Us section updated successfully", updatedSection });
    } catch (error) {
        res.status(500).json({ message: "Error updating Why Choose Us section", error });
    }
};

// Delete a "Why Choose Us" section by ID
export const deleteWhyChoose = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSection = await WhyModel.findByIdAndDelete(id);

        if (!deletedSection) {
            return res.status(404).json({ message: "Why Choose Us section not found" });
        }

        res.status(200).json({ message: "Why Choose Us section deleted successfully", deletedSection });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Why Choose Us section", error });
    }
};
