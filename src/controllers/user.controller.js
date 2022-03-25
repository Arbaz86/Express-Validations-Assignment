const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

router.post(
  "/",
  body("first_name").not().isEmpty(),
  body("last_name").not().isEmpty(),
  body("email").isEmail(),
  body("pincode").isLength({ min: 6, max: 6 }),
  body("age").not().isEmpty().isNumeric().custom((value) => {
    if(value < 1 || value > 100){
      
    }
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
