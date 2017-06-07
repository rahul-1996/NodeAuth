const passport = require('passport') ;
const User = require('../models/user') ;
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy ; 
const ExtractJwt = require('passport-jwt').ExtractJwt ; 


const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};


//Create jwt strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //payload has userid and timestamp
    //See if user id in payload exists in database. call done() with user object if it does.
    User.findById(payload.sub, function(err,user){
       if(err) return done(err, false) ; 
        if(user){
            done(null, user) ;
        }
        else{
            done(null, false) ; 
        }
    });
});


//Tell passprot to use this strategy

passport.use(jwtLogin);