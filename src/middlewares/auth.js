// This is a middleware/ interceptor

// imports
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// function which checks whether the user is authorised or not by checking its token
const auth = (req, res, next) => {
    try {
        // get token from request
        let token = req.headers.authorization;

        if (token) {
            // valid user

            // Split token string (sample token: bearer dfsdjfnsjnW@555dffsd)
            token = token.split(" ")[1]; // split token with empty space

            // decrypt token
            let user = jwt.verify(token, SECRET_KEY);

            // verify request's userid with the userid object stored in db which was auto generated at the time of new user object creation
            req.userId = user.id;
        } else {
            return res.status(401).json({ message: "Unauthorised User!" });
        }

        // if everything goes well then proceed
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorised User!" });
    }
}

//export
module.exports = auth;