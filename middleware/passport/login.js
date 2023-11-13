const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, user) => {
    const User = user;

    const validPassword = (user, password) => {
        return bcrypt.compare(password, user.password);
    }

    passport.use(
        "login",
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
                    if (!user) {
                        return done(null, false, {message: "User does not exist."});
                    }

                    if (!validPassword(user, password)) {
                        return done(null, false, {message: "Incorrect password."})
                    }

                    const userInfo = user.get();
                    return done(null, userInfo);
                })
                .catch(err => {
                    return done(null, false, {
                        message: "Something went wrong with your login"
                    }); 
                });
            }
        )
    );
};