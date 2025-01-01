
import multer from "multer";
import axios from "axios";
import { IMG_BB_API_KEY } from "../constans.js";

// Multer configuration for in-memory file storage
const upload = multer({ storage: multer.memoryStorage() });

const handleUploadFile = async (req, res, next) => {
    try {
        console.log("File:", req.file); // Multer দিয়ে ফাইল ডেটা প্রসেস
        console.log("Body:", req.body); // অন্যান্য ফর্ম ডেটা

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Create FormData for ImgBB API
        const formData = new FormData();
        formData.append("key", IMG_BB_API_KEY);
        formData.append("image", req.file.buffer.toString("base64")); // Convert file buffer to Base64

        // Upload to ImgBB
        const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("ImgBB Response:", response.data);

        const imgUrl = response.data.data.url;
        req.imageUrl = imgUrl

        next()

    } catch (error) {
        console.error("Error uploading file to ImgBB:", error.message);
        res.status(500).json({ error: "File upload failed" });
    }
};

export { upload, handleUploadFile };