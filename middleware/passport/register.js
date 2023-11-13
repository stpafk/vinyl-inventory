const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, user) => {
    const User = user;

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    passport.use(
        "signup",
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true,
            },
            (req, username, password, done) => {
                User.findOne({
                    username: username,
                })
                .then(user => {
                    if (user) {
                        return done(null, false, {message: "User already exists"});
                    }

                    User.create({username: username, password: hash})
                    .then((nUser, created) => {
                        return done(null, nUser);
                    })
                    .catch(err => {
                        return done(null, false, {message: "Something went wrong with SIGN-UP."})
                    })
                })
                .catch(err => {
                    return done(null, false, {
                        message: "Something went wrong with your login"
                    })
                });
            }
        )
    );
};