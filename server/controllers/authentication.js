const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
}


exports.signin = function (req, res, next) {
    res.send({
        token: tokenForUser(req.user)
    });
}

exports.signup = function (req, res, next) {
    // console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname ; 
    const lname = req.body.lname ; 

    // Ensure that the mandatory data is present

    if (!email || !password) {
        return res.status(422).send({
            error: "You must supply both an email address and password"
        })
    }

    // See if a user with the given email already exists

    User.findOne({
        email: email
    }, (err, foundUser) => {
        // Pass on error(s)
        if (err) {
            return next(err);
        }

        // Return an error if so

        if (foundUser) {
            return res.status(409).send({
                error: "That email address is already in use"
            }); // Conflicting user
        }

        // Create and save a new user record

        const newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function (err) {
            if (err) {
                return next(err);
            }

            res.send({
                token: tokenForUser(newUser)
            });
        });
    });
};

