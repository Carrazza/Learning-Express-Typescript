import mongoose from "mongoose";


const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password:String
}, { collection : 'user' });


const User = mongoose.model("User",userModel)

export default User