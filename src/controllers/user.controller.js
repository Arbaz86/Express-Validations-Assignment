const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

router.post(
  "/",
  body("first_name").not().isEmpty().withMessage("first_name not be empty"),
  body("last_name").not().isEmpty().withMessage("last_name not be empty"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("email is already taken");
      }
      return true;
    }),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("Picode must be 6 characters "),
  body("age")
    .not()
    .isEmpty()
    .withMessage("age cannot be Empty")
    .isNumeric()
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error(" age must be between 1 to 100 ");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(body("age"));
      const users = await User.create(req.body);

      return res.status(201).send({ users: users });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
