var express = require('express');
var router = express.Router();

const loginController = require("../controllers/loginController");

router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/user/register", function(req, res, next) { res.send("") });
router.post("/user/register", function(req, res, next) { res.send("") });

router.get("/user/login", function(req, res, next) { res.send("") });
router.post("/user/login", function(req, res, next) { res.send("") });


module.exports = router;
