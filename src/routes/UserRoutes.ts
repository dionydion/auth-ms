var express = require("express");
var router = express.Router();
var { signup, login } = require("../controllers/UserController");

router.post("/register", signup);
router.post("/login", login);
module.exports = router;
