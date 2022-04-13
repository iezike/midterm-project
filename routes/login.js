const express = require('express');
const router = express.Router();

const bcrypt = require("bcryptjs");
// const { getUserId, getUserByEmail } = require('../helpers');

module.exports = (db, dbQueries) => {

  router.get("/", (req, res) => {
    const templateVars = { user: null }
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    console.log('Here!!!!!!')
    const { email, password } = req.body
    if(!req.body.email || !req.body.password) return res.status(401).send('Wrong email or password')

    // issue here with getUserByEmail
    dbQueries.getUserByEmail(email, password, db)
    .then(user => {
      console.log('user:', user)
      if(user) {
        console.log('helloasdads',req.session.userID);
        req.session.userID = user.id;
        res.redirect('/index')
      }
    })
    .catch(error => {
      console.log(error);
    })
  });



  return router;
}
