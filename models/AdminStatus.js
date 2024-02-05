import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const adminstatSchema = new Schema({
     
     status:{
        type: String,
        required: true,
     },
     description:{
        email:String,
        keyword1:String,
        keyword2:String,
        nonTechProblemDescription:String,
     }

});

const AdminStatus = mongoose.models.AdminStatus || mongoose.model("AdminStatus", adminstatSchema);
export default AdminStatus;