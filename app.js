const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes");
const Sequelize = require("sequelize");
var passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];
var flash = require("connect-flash");

var SequelizeStore = require("connect-session-sequelize")(session.Store);
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
var sessionStore = new SequelizeStore({
  db: sequelize,
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("any secret string"));
app.use(
  session({
    secret: "any secret string",
    store: sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
// Run once to create session store table
sessionStore.sync();

/* Middleware to remove the trailing "/" from a route */
app.use((request, response, next) => {
  if (request.path.slice(-1) == "/" && request.path.length > 1) {
    const query = request.url.slice(request.path.length);
    response.redirect(301, request.path.slice(0, -1) + query);
  } else {
    next();
  }
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Connect Flash Implementation
app.use(flash());
app.use(function (request, response, next) {
  response.locals.messages = request.flash();
  next();
});

// Import PassportJS config
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use(router);

module.exports = app;