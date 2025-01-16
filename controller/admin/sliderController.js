import SliderModel from "../../model/admin/sliderModel.js";


export const PostSlider = async (req, res) => {
    try {
        const { slider, title } = req.body;
        const newSlider = SliderModel({
            slider,
            title
        });

        await newSlider.save();
        res.status(201).json({
            message: "Slider Posted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed To Post Slider"
        })
    }
};

//  public
export const getSliders = async (req, res) => {
    try {
        const sliders = await SliderModel.find();
        res.status(200).json(sliders);

    } catch (error) {
        res.status(500).json({
            message: "Failed To Fetch Slider"
        })
    }
};


//  admin Auth Guatd dite hobe
export const updateSliders = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSlider = await SliderModel.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        if (!updatedSlider) {
            return res.status(404).json({
                message: "Slider Not Found!"  // Fixed typo here
            });
        }

        return res.status(200).json({
            message: "Slider Updated!"  // Fixed typo here
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed To Update Slider"
        });
    }
};



//  admin Auth Guatd dite hobe
export const deleteSliders = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSlider = await SliderModel.findByIdAndDelete(id);

        if (!deletedSlider) {
            return res.status(404).json({
                message: "Slider Not Found!"  // Fixed typo here
            });
        }

        return res.status(200).json({
            message: "Slider Deleted!"  // Fixed typo here
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed To Delete Slider"
        });
    }
};

