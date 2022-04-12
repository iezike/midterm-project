const express = require('express');
const router = express.Router();

const bcrypt = require("bcryptjs");

module.exports = (db, dbQueries) => {
  router.get("/", (req, res) => {
    const templateVars = { user: null }
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body

    if(!email || !password) return res.status(401).send('Wrong email or password')

    dbQueries.getUserByEmail(email, password, db)
    .then(user => {
      if(user) {
        res.render('index', { user })
      }
    })
  });

  return router;
}

