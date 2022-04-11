const express = require('express');
const router = express.Router();

const bcrypt = require("bcryptjs");
const { getUserId, getUserByEmail } = require('../helpers');

module.exports = (db, dbQueries) => {
  router.get("/", (req, res) => {
    const templateVars = { user: null }
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body
    // const getId = dbQueries.getUserByEmail(email, password);
    if(!email || !password) return res.status(401).send('Wrong email or password')

    // console.log(getId[0]);

    dbQueries.getUserByEmail(email, password, db)
    .then(user => {
      if(user) {
        console.log(user.id)
        req.session.userID = user.id
        res.render('index', { user })
      }
    })
  });

  return router;
}

