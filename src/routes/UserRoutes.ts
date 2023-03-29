var express = require("express");
var router = express.Router();
var { signup, login } = require("../controllers/UserController");
var verifyToken = require("../middlewares/authJWT");

router.post("/register", signup);
router.post("/login", login);

router.get("/hiddencontent", verifyToken, (req, res) => {
  if (req.body.user == "admin") {
    res.status(200).send({
      message: "Congratulations!",
    });
  } else {
    res.status(403).send({
      message: "Unauthorised user",
    });
  }
});
module.exports = router;
