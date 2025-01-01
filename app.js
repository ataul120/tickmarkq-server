import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './route/users/userRoute.js';
import blogRouter from './route/users/blogRoute.js';
import adminRouter from './route/admin/adminAuthRoute.js';
import courseRouter from './route/admin/adminCourseRoute.js';
import questionRouter from './route/admin/adminQuestionRoute.js';
import resultRouter from './route/admin/resultRoute.js';
import purchaseRouter from './route/users/purchaseRoute.js';
import opinionRouter from './route/users/opinionRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the API Home Page!");
});


// User Routes
app.use("/api/user", userRouter);
app.use("/api/user", blogRouter);
app.use("/api/user/course", purchaseRouter);
app.use("/api/user/opinion", opinionRouter);


// admin course route
app.use("/api/admin/auth", adminRouter);

app.use("/api/admin/course", courseRouter)
app.use("/api/admin/question", questionRouter)


/// results / user and admin
app.use("/api/results", resultRouter)


// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        message: "The requested route does not exist on the server.",
    });
});


export default app;   
