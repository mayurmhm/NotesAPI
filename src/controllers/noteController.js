// Contains NOTE specific functions which works with Routes of endpoint

// imports
const noteModel = require("../models/note");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create note function
const createNote = async (req, res) => {

    // fetch data from request
    const { title, description } = req.body;

    // new note object
    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });

    // save new note to database
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// update note function
const updateNote = async (req, res) => {
    // access noteId object from noteRoutes
    const noteId = req.params.noteId;

    // fetch data from request
    const { title, description } = req.body;

    // create a new object to store in database
    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    };

    // update the record in database
    try {
        await noteModel.findByIdAndUpdate(noteId, newNote, {new: true});
        res.status(200).json(newNote)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });   
    }
    
};

// delete note function
const deleteNote = async (req, res) => {
    // access noteId object from noteRoutes
    const noteId = req.params.noteId;

    try {
        // get deleted note for returning in response
        const deletedNote = await noteModel.findByIdAndRemove(noteId);
        res.status(202).json(deletedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });           
    }

};

// get notes function
const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId }); // get all notes from database by userId
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// export
module.exports = { createNote, updateNote, deleteNote, getNotes }