import FreeResourceModel from "../../model/admin/freeRecourseModel.js";



export const createResourse = async (req, res) => {
    try {
        const { title, link } = req.body;

        const newLink = FreeResourceModel({
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

export const getResourse = async (req, res) => {
    try {
        const links = await FreeResourceModel.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Links"
        })
    }
}


export const updateResourse = async (req, res) => {
    const { id } = req.params;
    try {

        const isUpdated = await FreeResourceModel.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        if (!isUpdated) {
            return  res.status(404).json({
                message: "Resourse Not Found!"
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


export const deleteResourse = async (req, res) => {
    const { id } = req.params;
    try {

        const isDeleted = await FreeResourceModel.findByIdAndDelete(id)

        if (!isDeleted) {
          return  res.status(404).json({
                message: "Resourse Not Found!"
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
