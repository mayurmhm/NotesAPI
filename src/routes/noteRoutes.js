// This route contains NOTE related endpoints functions will be handled in another file called controllers

// import libraries
const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");

// object creation
const notesRouter = express.Router();

// Authenticated Endpoints : auth middleware will ensure that if the user is authorised then only hit the request i.e API
// get all notes
notesRouter.get("/", auth, getNotes); // here next method of auth becomes getNotes & auth will set userId in the request

// create a new note
notesRouter.post("/", auth, createNote); // here next method of auth becomes createNote & auth will set userId in the request

// delete note
notesRouter.delete("/:noteId", auth, deleteNote); // here next method of auth becomes deleteNote & auth will set userId in the request

// update note
notesRouter.put("/:noteId", auth, updateNote); // here next method of auth becomes updateNote & auth will set userId in the request

// export the endpoints in order to access it globally
module.exports = notesRouter;