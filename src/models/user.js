// User SCHEMA works as data classes

// imports
const mongoose = require("mongoose");

// object which defines what are the properties we need to store inside user table
// timestamps automatically adds 2 columns createdOn & modifiedOn
const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
}, {timestamps: true});

// export to use it globally
module.exports = mongoose.model("User", UserSchema);