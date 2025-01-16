
import express from "express"
import { deleteSliders, getSliders, PostSlider, updateSliders } from "../../controller/admin/sliderController.js";
const router = express.Router();

router.post("/create" , PostSlider);
router.get("/get-all" , getSliders);
router.put("/update/:id" , updateSliders); // admin auth guard
router.delete("/delete/:id" , deleteSliders); // admin auth guard



export default router;