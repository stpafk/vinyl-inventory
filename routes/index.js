var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
    if (req.session.isAuth){
        res.send("Logged In")
    }
    res.render("login_form")
})

router.get("/register", userController.register_create_get);
router.post("/register", userController.register_create_post);

router.get("/login", userController.login_create_get);
router.post("/login", userController.login_create_post);

module.exports = router;
