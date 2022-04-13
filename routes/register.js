const express = require('express');
const { route } = require('express/lib/application');
const router  = express.Router();
// const addUser = require("./helpers");



// Helper function
const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT *
    FROM users
    WHERE email =  $1`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
}


// Route to handle a user registeration form

module.exports = function(db) {
  // Helper function
const addUser =  function(name, email, password) {
  const queryString= `INSERT INTO users (name, email, password)
  VALUES(
  $1, $2, $3) RETURNING *`;
  return db.query( queryString,[name, email, password])
}

  router.get('/', (req, res) => {
    res.render('register')
  })
  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    const name = user.name;
    const password = user.password;
    const email = user.email;
    addUser(name, email, password)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      req.session.userID = result.id;
      // return result.rows[0];
      res.render('index')
    })
    .catch(e => res.send(e));
  });

  return router;
}

