import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    image : String,
    mobile : Number,
    todo : [
        {
            name : String
        }
    ]
})

const User = mongoose.model("Todo",userSchema)
export default User