// Contains USER specific functions which works with Routes of endpoint

// imports
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// functions
// Sign up user
const signup = async (req, res) => {
    // Existing user check
    // Hashed passeword (encrypt password)
    // New User Creation
    // Token Generation

    // make a model by fetching data from request's body
    const{username, email, password} = req.body;
    try {
        // Existing user check 
        // this compares fetched data from db with given email. We have used await. After its result we will proceed further.
        const existingUser = await userModel.findOne({email: email})

        // If user found then send response status as bad request i.e 400 because the user already exists
        if(existingUser) {
            return res.status(400).json({message: "User already exists!"});
        }

        // Hash password by using bcrypt library
        const hashedPassword = await bcrypt.hash(password, 10);

        // New User creation
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        // JWT Token Generation
        // Send Payload & Secret Key in the Sign function of JWT Token library
        // Pass Auto generated userId by MongoDb on user creation in id field
        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, SECRET_KEY);

        // send response
        res.status(201).json({user: result, token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong while creating a new user..."});
    }
}


// Sign In user
const signin = async (req, res) => {
    // Check existing user
    // match password

    // fetch data from request
    const {email, password} = req.body;

    try {
        // existing user
        // this compares fetched data from db with given email. We have used await. After its result we will proceed further.
        const existingUser = await userModel.findOne({email: email})

        // If user not found then send response status as bad request i.e 404 because the user doen not exists
        if(!existingUser) {
            return res.status(404).json({message: "User not found!"});
        }

        // match password
        // We have saved encrypted password in db & in request we have received plain text password so we will make use of bcrypt library
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword) {
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        // sign in user with New Token
        // JWT Token Generation
        // Send Payload & Secret Key in the Sign function of JWT Token library
        // Pass existing user's userId in id field
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, SECRET_KEY);

        // send response
        res.status(200).json({user: existingUser, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong while sign in..."});
    }


}

// export
module.exports = {signup, signin};