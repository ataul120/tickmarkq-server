// import Opinion from "../models/Opinion.js";
// import User from "../models/User.js";

import Opinion from "../../model/users/opinionModel.js";
import usersModel from "../../model/users/usersModel.js";

// POST: Create a new Opinion
export const createOpinion = async (req, res) => {
    try {

        const { userId } = req;
        const { opinion } = req.body;

        // Find user by user ID (if needed)
        const foundUser = await usersModel.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ message: "Not A Valid User!" });
        }

        if (opinion && opinion.length <= 10) {
            return res.status(401).json({ message: "Failed ! The Message Is too Short!" });
        }

        const newOpinion = new Opinion({
            user: userId,
            opinion
        });

        await newOpinion.save();
        res.status(201).json({ message: "Opinion added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// <======== GET: Get all opinions for user (secure with token) ==========>
export const getUserOpinion = async (req, res) => {
    try {
        const { userId } = req;

        // Find user by user ID (if needed)
        const foundUser = await usersModel.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ message: "Not A Valid User!" });
        }

        const opinions = await Opinion.find().sort({ createdAt: -1 });
        res.status(200).json(opinions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};


// <======== GET: Get all opinions for Admin (no Secure for admin) ==========>
export const getOpinionsAll = async (req, res) => {
    try {

        const opinions = await Opinion.find().populate('user', 'name photo');  // Populating user data
        res.status(200).json(opinions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};


// GET: Get an opinion by ID
export const getOpinionById = async (req, res) => {
    try {
        const opinion = await Opinion.findById(req.params.id).populate('user', 'name email');
        if (!opinion) {
            return res.status(404).json({ message: "Opinion not found" });
        }
        res.status(200).json(opinion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// PUT: Edit an opinion
export const editOpinion = async (req, res) => {
    try {
        const { userId } = req
        const { opinion } = req.body;

        // Find user by user ID  
        const foundUser = await usersModel.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ message: "Not A Valid User!" });
        }

        const updatedOpinion = await Opinion.findByIdAndUpdate(
            req.params.id,
            { opinion },
            { new: true }
        );

        if (!updatedOpinion) {
            return res.status(404).json({ message: "Opinion not found" });
        }

        res.status(200).json({ message: "Opinion updated successfully", updatedOpinion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// DELETE: Delete an opinion 
export const deleteOpinion = async (req, res) => {
    try {
        const deletedOpinion = await Opinion.findByIdAndDelete(req.params.id);

        if (!deletedOpinion) {
            return res.status(404).json({ message: "Opinion not found" });
        }

        res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};
