import mongoose from "mongoose";
const { Schema, Types } = mongoose;



const userProbSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    empid: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    keyword1: {
      type: String,
      required: true,
    },
    keyword2: {
      type: String,
      required: true,
    },
    nonTechProblemDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const UserProb = mongoose.models.UserProb || mongoose.model("UserProb", userProbSchema);

export default UserProb;
