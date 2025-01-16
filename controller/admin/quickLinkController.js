import QuickLinkModel from "../../model/admin/quickLinkModel.js";


export const createQuickLink = async (req, res) => {
    try {
        const { title, link } = req.body;

        const newLink = QuickLinkModel({
            title,
            link
        });

        await newLink.save();

        res.status(201).json({
            message: "Created a Link Succesfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Creating Link"
        })
    }
}

export const getLinks = async (req, res) => {
    try {
        const links = await QuickLinkModel.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Links"
        })
    }
}


export const updateLink = async (req, res) => {
    const { id } = req.params;
    try {

        const isUpdated = await QuickLinkModel.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        if (!isUpdated) {
            res.status(404).json({
                message: "Links Not Found!"
            })
        }

        res.status(200).json({
            message: "Succesfully Updated"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Links"
        })
    }
}


export const deleteLink = async (req, res) => {
    const { id } = req.params;
    try {

        const isDeleted = await QuickLinkModel.findByIdAndDelete(id)

        if (!isDeleted) {
            res.status(404).json({
                message: "Links Not Found!"
            })
        }

        res.status(200).json({
            message: "Succesfully Delete"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Links"
        })
    }
}
