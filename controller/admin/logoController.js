import LogoModel from "../../model/admin/logoModel.js";


const PostLogo = async (req, res) => {
    try {
        const { logo } = req.body;

        //  check Exist
        const exist = await LogoModel.findOne();

        if (exist) {
            res.status(400).json({
                message: "Logo Already Created!"
            })
        }

        const newLogo = LogoModel({
            logo
        });

        await newLogo.save();

        res.status(201).json({
            message: "Logo Posted"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed To Post Logo"
        })
    }
};



const getLogo = async (req, res) => {
    try {

        const logo = await LogoModel.findOne();

        res.status(200).json(logo)

    } catch (error) {
        res.status(500).json({
            message: "Failed To Post Logo"
        })
    }
};

const deleteLogo = async (req, res) => {
    const { logoId } = req.params;
    try {

        const isDeleted = await LogoModel.findByIdAndDelete(logoId);

        if (!isDeleted) {
            res.status(404).json({
                message: "Logo not found!"
            })
        };


        res.status(200).json({
            message: "Logo Delete Succesfull"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed To Delete Logo"
        })
    }
};


export {
    PostLogo, getLogo , deleteLogo
}