const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const isAuth = require('../app')

exports.register_create_get = asyncHandler(async (req, res, next) => {
    res.render("register_form", {})
})

exports.register_create_post = [
    body("username").contains(" ").escape("Sould not have spaces"),
    body("username").isLength({min: 3}).escape("Username should be 3 or more characters"),
    body("email").isLength({min: 3, max: 100}).escape("Input a valid e-mail."),
    body("password").isLength({min: 6}).escape("Password should be bigger than 3."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(body);

        req.body.password = await bcrypt.hash(req.body.password, 12)

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const userExist = await User.findOne({email: req.body.email});
        if (userExist) res.render("register_form", { user: user, emailTaken: "Email already registered."});

        if (!errors.isEmpty()) {
            res.render("register_form", {
                user: user,
                errors: errors.array(),
            })
            return;
        }

        await user.save();
        res.redirect("/")
    })
]

exports.login_create_get = asyncHandler(async (req, res, next) => {
    res.render("login_form", {})
})