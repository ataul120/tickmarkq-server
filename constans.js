const Port = process.env.PORT || 8500;
const MONGO_URL = process.env.MONGO_URL;
const IMG_BB_API_KEY = process.env.IMG_BB_API_KEY;
const ADMIN_IDENTIFER = process.env.ADMIN_IDENTIFER;
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET;

export {
    Port,
    MONGO_URL,
    IMG_BB_API_KEY,
    ADMIN_IDENTIFER,
    ADMIN_TOKEN_SECRET
};   
