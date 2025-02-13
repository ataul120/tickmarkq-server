import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './route/users/userRoute.js';
import blogRouter from './route/users/blogRoute.js';
import adminRouter from './route/admin/adminAuthRoute.js';
import courseRouter from './route/admin/adminCourseRoute.js';
import questionRouter from './route/admin/adminQuestionRoute.js';
import resultRouter from './route/admin/resultRoute.js';
import opinionRouter from './route/users/opinionRoute.js';
import sliderRouter from './route/admin/sliderRoute.js';
import headlineRouter from './route/admin/headlineRoute.js';
import noticeRouter from './route/admin/noticeRoute.js';
import courseInfoRouter from './route/admin/courseInfoRoute.js';
import quickLinksouter from './route/admin/quickLinkRoute.js';
import whyChooseRouter from './route/contents/whyChooseRoutejs';
import logoRouter from './route/admin/logoRoute.js';
import bookRouter from './route/contents/bookRoute.js';
import aboutRouter from './route/contents/aboutRoute.js';
import seoRouter from './route/admin/seoRoute.js';
import bkashRouter from './route/bkash/bkashRoute.js';
import purChaseRouter from './route/users/myCourseRoute.js';

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
app.use("/api/user", userRouter);
app.use("/api/user/course", purChaseRouter);
app.use("/api/user/opinion", opinionRouter);


// admin course route
app.use("/api/admin/auth", adminRouter);

app.use("/api/admin/course", courseRouter)
app.use("/api/admin/question", questionRouter);

app.use("/api/admin/logo", logoRouter)

//  contents
app.use("/api/content/slider", sliderRouter)
app.use("/api/content/headline", headlineRouter)
app.use("/api/content/notice", noticeRouter)
app.use("/api/content/courseInfo", courseInfoRouter)
app.use("/api/content/quickLinks", quickLinksouter)

app.use("/api/content/whychoose", whyChooseRouter)
app.use("/api/content/aboutpage", aboutRouter)
app.use("/api/content/books", bookRouter)

/// results / user and admin
app.use("/api/results", resultRouter)

// seo route
app.use("/api/admin/seo", seoRouter)

app.use("/api/bkash", bkashRouter)

//  bkash route for testing
// app.use("/api/bkash" , bkashRouter)


// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        message: "The requested route does not exist on the server.",
    });
});


export default app;   
