const express = require("express");
const router = express.Router();

// only users with verified tokens can access this GET route
// only users with a verified token will be presented with the response.

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

module.exports = router;
