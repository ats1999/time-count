import mongoose from "mongoose";
const useSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    token:String,
});
module.exports = mongoose.models.User || mongoose.model('User', useSchema);