import mongoose from "mongoose";

const AboutPageSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    aboutPhoto: { type: String, required: true }, // Image URL

    missionTitle: { type: String, required: true },
    missionDesc: { type: String, required: true },

    vissionTitle: { type: String, required: true },
    vissionDesc: { type: String, required: true },
    whyHeading: { type: String, required: true },
    aboutWhy: [
        {
            whyTitle: { type: String },
            whyDesc: { type: String }
        }
    ],

    teamMembers: [
        {
            name: { type: String },
            position: { type: String },
            photo: { type: String },
            link: { type: String },
        }
    ]
}, { timestamps: true });

const AboutPage = mongoose.model("AboutPage", AboutPageSchema);

export default AboutPage;
