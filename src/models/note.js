// Notes SCHEMA works as data classes

// imports
const mongoose = require("mongoose");

// object which defines what are the properties we need to store inside user table
// mongoose.Schema.Types.ObjectId automatically maps userId autogenerated by MongoDB when new user is created
// ref is used to tell which table it should refer
// timestamps automatically adds 2 columns createdOn & modifiedOn
const NoteSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {timestamps: true});

// export to use it globally
module.exports = mongoose.model("Note", NoteSchema);