// This route contains USER related endpoints functions will be handled in another file called controllers

// import libraries
const express = require("express");
const { signup, signin } = require("../controllers/userController");

// object creation
const userRouter = express.Router();

// Unauthenticated Endpoints i.e APIs
// get user list
userRouter.get("/getUsers", (req, res) => {
    res.send("GET Users Request Called...");
});
// sign up post request
userRouter.post("/signup", signup);

// sign in post request
userRouter.post("/signin", signin);

// export the endpoints in order to access it globally
module.exports = userRouter;