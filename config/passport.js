const passport = require("passport");
const LocalStrategy = require("passport-local");
const { validatePassword } = require("../lib/passwordUtils");
const { Hospital } = require("../models");

passport.use(
  "local-user",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      Hospital.findOne({
        where: {
          email: username,
        },
      })
        .then(async function (user) {
          if (user === null) {
            return done(null, false, { message: "Hospital is not registered" });
          }
          const result = await validatePassword(password, user.passwordHash);
          if (result) {
            return done(null, user);
          } else {
            console.log("Invalid password");
            return done(null, false, { message: "Invalid Password" });
          }
        })
        .catch((error) => {
          return done(null, false, {
            message: error.message,
          });
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user in session: ", user.id);
  done(null, { id: user.id, type: "User" });
});

passport.deserializeUser((obj, done) => {
  Hospital.findByPk(obj.id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});