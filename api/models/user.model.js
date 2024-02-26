import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true, 
    },
    profilePicture:{
        type:String,
        default:"https://firebasestorage.googleapis.com/v0/b/batorartomoro-147bc.appspot.com/o/1706408895343about-img-2.jpg?alt=media&token=be9a8427-9407-4e89-be75-6a31620d9a11",
    },
    isAdmin: {
        type: Boolean,
        default:false,
    }
},{timestamps:true} 

);
const User=mongoose.model('User',userSchema);
export default User;