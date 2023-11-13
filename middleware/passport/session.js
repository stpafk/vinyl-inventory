const register = require('./register');
const login = require('./login');

module.exports = (passport, user) => {
    const User = user;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        User.findById(id)
        .then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    login(passport, user);
    signup(passport, user);
};