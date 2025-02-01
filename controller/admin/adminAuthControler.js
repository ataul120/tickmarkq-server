import bcrypt from "bcryptjs";
import adminAuthModel from "../../model/admin/adminAuthModel.js";
import jwt from "jsonwebtoken"
import { ADMIN_TOKEN_SECRET, ADMIN_IDENTIFER } from "../../constans.js";


// verify admin or not . admin hole login form open hobe

const verifyAdmin = async (req, res) => {
    const { varifyAdmin } = req.body;
    const identifier = ADMIN_IDENTIFER;

    try {

        const verfied = (identifier === varifyAdmin)

        if (!verfied) {
            res.status(200).json({
                message: "Admin verification failed!"
            });

            return
        }
     
        // Send token in the response
        res.status(200).json({
            message: "Admin Verified",
            verfied: true
        });


    } catch (error) {
        res.status(500).json({
            message: "Failed To Verify"
        })
    }
}



const createAdmin = async (req, res) => {
    const { photo, username, email, password, role } = req.body;

    try {
        // Check if email or username already exists
        const existingAdmin = await adminAuthModel.findOne({
            $or: [{ email }, { username }],
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Email or username already exists. Please choose a different one.",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin with hashed password
        const newAdmin = new adminAuthModel({
            photo,
            username,
            email,
            password: hashedPassword,
            role: role || "admin", // Default role to "admin" if not provided
        });

        await newAdmin.save();

        res.status(201).json({ message: `${role} created successfully` });
    } catch (error) {
        res.status(500).json({ message: "Failed to create" });
    }
};


const adminLogin = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if admin with the provided email and role exists
        const admin = await adminAuthModel.findOne({ email, role });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found or role mismatch" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = {
            adminId: admin._id,
            role: admin.role,
        };

        const token = jwt.sign(payload, ADMIN_TOKEN_SECRET, {
            expiresIn: "3h",
        });

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


const getallAdmins = async (req, res) => {
    try {
        const admins = await adminAuthModel.find().select("-password");
        res.status(200).json(admins)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAdminById = async (req, res) => {
    const { adminId } = req

    try {
        const admin = await adminAuthModel.findOne({ _id: adminId }).select("-password")
        if (admin && Object.keys(admin).length < 1) {
            return res.status(404).json({ message: "Admin not found" })
        }

        res.status(200).json(admin)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
        // Hash the new password if provided
        let updatedFields = { username, email, role };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const updatedAdmin = await adminAuthModel.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};



const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;


        const deletedAdmin = await adminAuthModel.findByIdAndDelete(id);

        if (!deletedAdmin) {

            return res.status(404).json({
                message: " not found!",
            });
        }


        return res.status(200).json({
            message: " deleted successfully!",
        });
    } catch (error) {

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};


export { verifyAdmin, createAdmin, adminLogin, getallAdmins, getAdminById, updateAdmin, deleteAdmin };
