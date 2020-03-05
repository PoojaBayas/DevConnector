const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const UserModel = require("../../models/User");

//@route  POST api/users/register
//@desc   Register User
//@acess  public
router.post("/register", (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exist" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new UserModel({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar // or you could have just done  only avatar becoz both have the same name
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err)); // this catch is for findone email
});

//@route  POST api/users/Login
//@desc   Login  User
//@acess  public

router.post("/login", (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "USerNot found" });
      } else {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            //USer match ,now creating a token
            //payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };
            //sign token (create a token)
            jwt.sign(
              payload,
              key.SecretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "bearer" + token
                });
              }
            );
            //return res.json({ msg: "Success" });
          } else {
            return res.status(400).json({ password: "PasswordIncorrect!" });
          }
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
