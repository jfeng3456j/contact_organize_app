const express = require("express");
const router = express.Router();
//express validator import
const { check, validationResult } = require("express-validator");
//bcrypt import
const bcrypt = require("bcryptjs");
//JWT
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const config = require("config");

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please Include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { name, email, password } = req.body;
    try {
      //pass a mongo User Object to user
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      //create new user based on the destructure req.body
      user = new User({
        name,
        email,
        password,
      });
      //use bcrypt to add sale
      const salt = await bcrypt.genSalt(10);

      //hash the password
      user.password = await bcrypt.hash(password, salt);

      //call the mongo save sql
      await user.save();

      //create the payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      //jwt.io for jwt decoder
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          //3600 is an hour
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
