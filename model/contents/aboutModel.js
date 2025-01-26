import mongoose from "mongoose";
// Define the schema for the About page
const AboutSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    subHeading: {
        type: String,
        required: true
    },
    aboutPhoto: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    vision: {
        type: String,
        required: true
    },
    whyChoose: {
        type: [String], // Array of strings
        required: true
    },
    team: {
        type: [{
            name: String,
            position: String,
            photo: String
        }],
        required: true
    }
});

// Create and export the model based on the schema
const About = mongoose.model('About', AboutSchema);
export default About;
