// log
console.log("Notes API Development");

// import packages & libraries
const express = require("express");

// import something locally & create object
const quotesFromJson = require("./quotes.json");
const notesRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express()
const cors = require("cors");

// read config file & generate environment variables 
dotenv.config();

// parse request body to json
app.use(express.json());

// cors middleware will add headers
app.use(cors());

// For testing only
// define middleware/ Interceptor: It works like when request is hit & response is successful then the code in the next will be executed. 
// app.use((req, res, next) => {
//      console.log("HTTP Method - " + req.method + " , URL - " + req.url);
//     next();
// });


// define user router: All the user related endpoints could be accessible when /users is added in the url (e.g. http://localhost:5000/users/signup)
app.use("/users", userRouter);

// define user router: All the user related endpoints could be accessible when /notes is added in the url (e.g. http://localhost:5000/notes/create)
app.use("/notes", notesRouter);

// define http methods get/put/post/delete
// / is considered as root
// to check output call localhost:5000 on browser or postman
app.get("/", (req, res) => {
    res.send("Notes API...");
});

// It will give us port no. If not available default 5000 will be used.
const PORT = process.env.PORT || 5000

// Connect with your Mongo DB Database (paste connection link from mongo db site : mongodb+srv://mayurmhm:<password>@cluster0.so6jo.mongodb.net/?retryWrites=true&w=majority)
// process.env will give the available environment variable. In this case we need MONGO_URL which we have defined.
mongoose.connect(process.env.MONGO_DEV_URL)
    .then(() => {
        // When database connection is successfull execute this code

        // instruction execute the requests which will come on the mentioned port no
        app.listen(PORT, () => {
            console.log("Connection with Mongo DB is successful... \nServer started on port no " + PORT);
        });
    })
    .catch((error) => {
        console.log("Error occured while establishing connection with Mongo DB...");
        console.log(error);
    });


// to check output call localhost:5000/quote on browser or postman
app.get("/quote", (req, res) => {
    // send json as a respone
    //res.status(200).json(quotesFromJson);
});

// to get random quote
app.get("/randomQuote", (req, res) => {
    // logic to get random quote from the json
    //let randomIndex = Math.floor(Math.random() * quotesFromJson.length);
    //let randomQuote = quotesFromJson[randomIndex];

    //res.status(200).json(randomQuote);
});