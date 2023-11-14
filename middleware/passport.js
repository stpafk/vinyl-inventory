const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user')

module.exports=function(passport) {

    const signup = (req, username, password, done) => {
        User.find({username: username})
        .then((users) => {
            if (users) {
                return done(null, false, {message: "Already taken username"})
            }

            return done(null, username);
        })
        .catch((err) => {
            return done(err);
        })
    }

    passport.use(
        "signup",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        }, signup)
    )

}

