const express = require('express');
const router = express.Router();

const bcrypt = require("bcryptjs");
// const { getUserId, getUserByEmail } = require('../helpers');

module.exports = (db, dbQueries) => {

  router.get("/", (req, res) => {
    const templateVars = { activeUser: null };
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send('Wrong email or password');
    }
    dbQueries.getUserByEmail(email, password, db)
      .then(user => {
        if (user) {
          req.session.userID = user.id;
          return res.redirect('/index');
        } else {
          return res.status(401).send('No user found');
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
  return router;
};
