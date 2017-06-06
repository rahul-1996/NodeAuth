const User = require('../models/user');

exports.signup = function (req, res, next) {
    const fname = req.body.fName;
    const lname = req.body.lName;
    const email = req.body.email;
    const password = req.body.password;

    if(!email|| !password || !fname || !lname){
        return res.status(422).send({error: 'You must provide valid data.'});
    }
    
    //See if user with given email already exists
    User.findOne({
        email: email
    }, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        //If a user with email exists, return an error. 
        if (existingUser) {
            return res.status(422).send({
                error: 'Email is in use'
            });
        }

        //Create and save record if email does not exist.
        const user = new User({
            fname: fname,
            lname: lname,
            email: email,
            password: password
        });

        user.save(function (err) {
            return next(err);

            //Respond to request indicating the user was created
            res.json(user);
        });

    });


}
