const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User");

//@route  POST api/users/register
//@desc   Register User
//@acess  public
router.post("/register", (req, res) => {
  UserModel.findOne({ email: req.body.email });

});

module.exports = router;
