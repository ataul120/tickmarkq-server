
import axios from "axios";

// ImgBB API key (environment variable থেকে নিতে হবে)
// const IMG_BB_API_KEY = process.env.IMGBB_API_KEY;
const IMG_BB_API_KEY = "862850e874b9b92bba3bbba84383b4dd";

// Function to upload image to ImgBB
const uploadImageToImgBB = async (imageBuffer) => {
    try {
        // Convert buffer to base64
        const fileBase64 = imageBuffer.toString('base64');

        // ImgBB API call
        const response = await axios.post('https://api.imgbb.com/1/upload', null, {
            params: {
                key: IMG_BB_API_KEY,
                image: fileBase64
            }
        });

        // Return the image URL
        return response.data.data.url;
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};

export default uploadImageToImgBB;
