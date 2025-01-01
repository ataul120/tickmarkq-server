import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ADMIN_TOKEN_SECRET } from '../constans.js';

dotenv.config();

const adminAuthGuard = async (req, res, next) => {
    const { authorization } = req.headers;

    // Check if authorization header is missing
    if (!authorization) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = Jwt.verify(token, ADMIN_TOKEN_SECRET);
        req.adminId = decoded.adminId;
        next();
        
    } catch (error) {
        res.status(401).json({
            message: "Authentication Failed",
            error: error.message
        });
    }
};

export default adminAuthGuard; 
