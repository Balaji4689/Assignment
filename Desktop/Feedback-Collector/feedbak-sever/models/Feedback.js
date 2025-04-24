
import mongoose, { Schema } from "mongoose";

const FeedbackSchema =new Schema({
    UserName:{
        type:String ,
        required:true,
        trim:true
    },
    email:{
        type:String ,
        required:true,
        trim:true,
        lowercase: true
    },
    feedback:{
        type:String ,
        required:true,
        trim:true
    },

})

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;