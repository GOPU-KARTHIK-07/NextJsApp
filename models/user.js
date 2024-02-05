import mongoose, { models } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({

    _id: {
        type: Schema.Types.ObjectId,
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
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });



const User = models.User ||  mongoose.model("User",userSchema);
export default User;