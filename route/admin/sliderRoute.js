
import express from "express"
import { deleteSliders, getSliders, PostSlider } from "../../controller/admin/sliderController.js";
const router = express.Router();

router.post("/create" , PostSlider);
router.get("/get-all" , getSliders);
router.delete("/delete/:id" , deleteSliders);



export default router;