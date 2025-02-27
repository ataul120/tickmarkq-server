import mongoose from "mongoose";

const AdminSceretSchema = mongoose.Schema({
    adminLoginSecret: {
        type: String,
        required: true
    },
}, { timestamps: true });

const AdminSceretModel = mongoose.model("adminSecret", AdminSceretSchema);

export default AdminSceretModel;