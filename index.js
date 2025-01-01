import mongoose from 'mongoose';  // mongoose কে import করা
import app from './app.js';  // app কে import করা
import { Port, MONGO_URL } from './constans.js';  // Port এবং MONGO_URL ইমপোর্ট করা

// Server listen and Database connection
app.listen(Port, async () => {
    try {
        console.log('Server is running');
        await mongoose.connect(MONGO_URL);  // MongoDB connection
        console.log("Database Is Connected");
    } catch (error) {
        console.log("Database is not Connected : ", error);  // Error handling
    }
});
