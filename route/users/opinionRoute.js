import express from "express";
import { createOpinion, deleteOpinion, editOpinion, getOpinionsAll, getUserOpinion } from "../../controller/users/opinionController.js";
import authGuard from "../../midlewere/authGuard.js";

const router = express.Router();

router.post("/create", authGuard, createOpinion); // ok
router.get("/view", authGuard, getUserOpinion);// ok
router.get("/view/all", getOpinionsAll); // all public-ok / ok admin control .
router.put("/update/:id", authGuard, editOpinion); // ok
router.delete("/delete/:id", deleteOpinion); // ok


export default router