import mongoose, { models } from "mongoose";
import { Schema } from "mongoose";

const adminSchema = new Schema({
    empid: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const Admin = models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
