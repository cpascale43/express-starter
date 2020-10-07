const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;

// const express = require("express");
// const mongoose = require("mongoose");
// const passport = require("passport");
// const bodyParser = require("body-parser");

// const UserModel = require("./model/model");

// mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.set("useCreateIndex", true);
// mongoose.connection.on("error", (error) => console.log(error));
// mongoose.Promise = global.Promise;

// require("./auth/auth");

// const routes = require("./routes");
// const secureRoute = require("./routes/secure-routes");

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", routes);

// // Plug in the JWT strategy as a middleware so only verified users can access this route.
// app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// // Handle errors.
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.json({ error: err });
// });

// app.listen(3000, () => {
//   console.log("Server started.");
// });
