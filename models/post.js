const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user : {
        type: String,
        required:[true,"Please Enter Your UserId"],
    },
    video : {
        type: String,
        required:[true,"Please Enter Video link"],
    },
    title : {
        type: String,
        required:[true,"Please Enter Video title"],
    },
    thombnail : {
        type: String,
        required:[true,"Please Enter thombnail link"],
    },
    isLiked : [
        {
                type: String
        }
    ],
    isComment : [
        {
                userId: String,
                userName: String,
                message: String
        }
    ],
    views : {
        type : Number,
        default : 0
    },
    time : { type : Date, default: Date.now }
    
   
})

module.exports= mongoose.model("post", postSchema);

