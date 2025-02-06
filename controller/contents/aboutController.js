import About from "../../model/contents/aboutModel.js";

const createAbout = async (req, res) => {
    try {
        const existingAbout = await About.findOne();
        if (existingAbout) {
            return res.status(400).json({ message: 'An About page already exists. You can only update it.' });
        }

        const newAbout = await About.create(req.body);
        await newAbout.save()
        res.status(201).json({
            message: "About Page Create Succesfull"
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        res.status(200).json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAbout = async (req, res) => {
    try {

        const existingAbout = await About.findOne();
        if (!existingAbout) {
            return res.status(404).json({ message: 'No About page found to update.' });
        }


        const updatedAbout = await About.findByIdAndUpdate(existingAbout._id, req.body, { new: true });
        res.status(200).json(updatedAbout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const deleteAbout = async (req, res) => {
    try {
        await About.deleteOne();
        res.status(200).json({ message: 'Deleted about page content' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export {
    createAbout, getAbout, updateAbout, deleteAbout
}