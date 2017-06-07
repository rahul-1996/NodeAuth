const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
    fName: String,
    lName: String,
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



// Create the model class

const ModelClass = mongoose.model('user', userSchema);

//onSavehook encrypt password


// Export the model ss

module.exports = ModelClass;
