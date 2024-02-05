import mongoose,{models} from "mongoose";
import {Schema } from "mongoose";
import { Types } from "mongoose";
import UserProb from "./UserProb";

const  ProblemCountSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        auto:true,

    },
    problem:[{
        type:Schema.Types.ObjectId,
        ref:UserProb,

    }],
},{timestamps:true});

const ProblemCount = models.ProblemCount || mongoose.model("ProblemCount",ProblemCountSchema);
export default ProblemCount;

