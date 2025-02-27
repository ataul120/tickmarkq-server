import AdminSceretModel from "../../model/admin/adminSecreteModel.js"
import bcrypt from 'bcryptjs';

export const createSecretKey = async (req, res) => {
    try {
        const { adminLoginSecret } = req.body;

        const isExist = await AdminSceretModel.findOne({});

        if (isExist) {
            return res.status(400).json({
                message: "Already Created a secrete code!"
            })
        }

        const saltRounds = 10;
        const hashSecreteKey = await bcrypt.hash(adminLoginSecret, saltRounds);

        const newSecrete = AdminSceretModel({ adminLoginSecret: hashSecreteKey });
        await newSecrete.save();

        res.status(201).json({
            message: "succesfully Created"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Create secrete Code"
        })
    }
};


export const verifySecreteKey = async (req, res) => {
    try {
        const { adminLoginSecret } = req.body;
    
        const isSecret = await AdminSceretModel.findOne({});

        const isMatch = await bcrypt.compare(adminLoginSecret, isSecret.adminLoginSecret);

        if (!isMatch) {
            return res.status(400).json({ message: "Admin verification failed", verfied: false });
        }

        res.status(200).json({
            message: "Admin Verified succesfully",
            verfied: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Verified secrete Code",
            verfied: false
        })
    }
};

export const updateSecreteKey = async (req, res) => {
    try {
        const { adminLoginSecret } = req.body;

        const saltRounds = 10;
        const hashSecreteKey = await bcrypt.hash(adminLoginSecret, saltRounds);

        const updatedSecret = await AdminSceretModel.findOneAndUpdate(
            {},
            { adminLoginSecret: hashSecreteKey },
            { new: true, upsert: true }
        );

        if (!updatedSecret) {
            return res.status(404).json({
                message: "Admin secret key not found"
            });
        }

        res.status(200).json({
            message: "Admin secret key updated successfully"
        });

    } catch (error) {
        console.error("Error updating admin secret key:", error);
        res.status(500).json({
            message: "Failed to update admin secret key",
        });
    }
};
