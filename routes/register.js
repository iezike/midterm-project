const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

// Route to handle a user registeration form
module.exports = function (db) {
  // Helper function
  const addUser = function (name, email, password) {
    const queryString = `INSERT INTO users (name, email, password)
  VALUES(
  $1, $2, $3) RETURNING *`;
    return db.query(queryString, [name, email, password])
  }

  // const getUserWithEmail = function (email) {
  //   const queryStringEmail = `SELECT *
  //   FROM users
  //   WHERE email = $1`
  //   const values = [email]
  //   return db.query(queryStringEmail, values)
  // }

  router.get('/', (req, res) => {
    res.render('register')
  })
  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    const name = user.name;
    const password = user.password;
    const email = user.email;
    if (email === "" || password === "" || name === "") {
      return res.status(403).send("Invalid User");
    }
    // console.log(getUserWithEmail(email))
    // if (getUserWithEmail(email)) {
    //   return res.status(403).send("Email already exit!");
    // }
    addUser(name, email, password)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      const userID = result.rows[0]
      console.log('^^^^^^^^',userID);
      req.session.userID = userID.id;
      res.redirect('/index')
    })
    .catch(e => res.send(e));
  });

  return router;
}
