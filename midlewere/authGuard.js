import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authGuard = async (req, res, next) => {
    const { authorization } = req.headers;

    // Check if authorization header is missing
    if (!authorization) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = Jwt.verify(token, process.env.TOKEN_SECRET); 
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Authentication Failed",
            error: error.message
        });
    }
};

export default authGuard; 
