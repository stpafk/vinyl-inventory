var express = require('express');
var router = express.Router();
const passport = require('passport');

const userController = require("../controllers/userController");
const ps = require('../middleware/passport')

router.get("/", (req, res) => {
    if (req.session.isAuth){
        res.send("Logged In")
    }
    res.render("login_form")
})

router.get("/register", userController.register_create_get);
router.post("/register", userController.register_create_post);

router.get("/login", userController.login_create_get);
router.post("/login", passport.authenticate("login"), function(req, res) {
    res.redirect("/catalog")
});

module.exports = router;
