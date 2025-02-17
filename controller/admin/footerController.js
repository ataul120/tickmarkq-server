import FooterModel from "../../model/admin/footerModel.js";

export const postFooter = async (req, res) => {
    try {

        const isExist = await FooterModel.findOne({});

        if (isExist) {
            return res.status(400).json({
                message: "Already Have a footer , now can edit this"
            })
        }

        const newFooter = FooterModel(req.body);

        await newFooter.save();

        res.status(200).json({
            message: "Footer Posted succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to post footer",
            error: error
        })
    }
};



export const getFooter = async (req, res) => {
    try {

        const footer = await FooterModel.find();

        res.status(200).json(footer)

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch footer",
            error: error
        })
    }
};


export const updateFooter = async (req, res) => {
    const { id } = req.params;
    try {

        const isUpdated = await FooterModel.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });

        if (!isUpdated) {
            return res.status(404).json({
                message: "footer not found"
            })
        };


        res.status(200).json({
            message: "footer updated succesfully"
        })


    } catch (error) {
        res.status(500).json({
            message: "Failed to Updat footer",
            error: error
        })
    }
}