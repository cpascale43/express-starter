const express = require("express");
const passport = require("passport");

const router = express.Router();

// when a user sends a POST request to this route,
// Passport authenticates the user based on the middleware created previously.
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    try {
      res.json({ message: "Signup successful", user: req.user });
    } catch (error) {
      console.log('im failing here')
      return next(error);
    }
  }
);

module.exports = router;
