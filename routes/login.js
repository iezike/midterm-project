const express = require('express');
const router = express.Router();

const bcrypt = require("bcryptjs");
// const { getUserId, getUserByEmail } = require('../helpers');

module.exports = (db, dbQueries) => {
  const getUserName = (email) => {
    const userNameQuery = ` SELECT name
    FROM users
    WHERE email = $1`;
    return db.query(userNameQuery, [email]).then(res => {
      if (res.rows[0]) {
        return res.rows[0].email;
      }
      return null;
    })
  }

  router.get("/", (req, res) => {
    const templateVars = { activeUser: null }
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(401).send('Wrong email or password')
    }
    // console.log(getUserName(email))
    // if (!getUserName(email)){
    //   return res.status(401).send('No user found')
    // }
    dbQueries.getUserByEmail(email, password, db)
    .then(user => {
      if(user) {
        req.session.userID = user.id;
        console.log('logged in as', user.name );
        return res.redirect('/index')
      } else {
        return res.status(401).send('No user found')
      }
    })
    .catch(error => {
      console.log(error);
    })
  });



  return router;
}
