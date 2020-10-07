// authentication middleware used to authenticate requests.
const passport = require("passport");
// email and password strategy
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../model/model");

// On SIGNUP, saves the information provided by the user to the db,
// then sends the user info to the next middleware if successful.
// otherwise, it reports an error.
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// on LOGIN, finds one user associated with the email provided.
// if the user does not match any in the db, returns 'User not found' error.
// if the password does not match, returns 'Wrong password' error.
// if the user & password match, returns a 'Logged in successfully' message,
// and the user info is sent to the next middleware.
passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// verify that the tokens haven't been manipulated and are valid
// this allows users with tokens to access certain secure routes
passport.use(
  new JWTStrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
