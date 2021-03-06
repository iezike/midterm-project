// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
app.use(express.json())

const cookieSession = require("cookie-session")
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}))
const dbQueries = require('./helpers.js')

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
console.log("DB Params: ", dbParams);
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const addResourcesRoutes = require("./routes/add_resources");
const homepageRoutes = require("./routes/homepage");
const updateProfileRoutes = require("./routes/update_profile");
const favouriteRoutes = require("./routes/my_favourites");
const searchRoutes = require("./routes/search_resources");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/login", loginRoutes(db, dbQueries));
app.use("/api/register", registerRoutes(db));
app.use("/index", homepageRoutes(db));

// Note: mount other resources here, using the same pattern above
app.use('/resources', addResourcesRoutes(db));
app.use("/api/update", updateProfileRoutes(db));

app.use('/favourites', favouriteRoutes(db));
app.use("/api/search", searchRoutes(db));
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// pass info from db into route by using templateVar
// call templateVar
// use .then to render db info onto page via templatevar

  app.get("/", (req, res) => {
    res.redirect("/index");
});


app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
