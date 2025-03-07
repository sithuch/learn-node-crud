const mongoose = require("mongoose");
// import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    // role :{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "Role"
    // }
});

// const RoleSchema = new mongoose.Schema({
//     name : String,
//     description : String,
//     permissions : String,
// })
module.exports = mongoose.model("User", userSchema);
// module.exports = mongoose.model("Role", RoleSchema);