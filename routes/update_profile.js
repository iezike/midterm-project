const express = require('express');
const { route } = require('express/lib/application');
const { user, password } = require('pg/lib/defaults');
const router = express.Router();



// Route to handle resource update
module.exports = function (db) {
  const updateUser = function (userID, name, email, password) {
  const queryString = `UPDATE users
    SET name= $2, email = $3, password = $4
    WHERE id = $1;`;
    return db.query(queryString, [userID,name, email,password])
  }
  const getUserName = (userID) => {
    const userNameQuery = ` SELECT name
    FROM users
    WHERE id = $1`;
    return db.query(userNameQuery, [userID]).then(res => {
      if (res.rows[0]) {
        return res.rows[0].name;
      }
      return null;
    })
  }
  router.get('/', (req, res) => {
    const userID = req.session.userID
    getUserName(userID)
    .then(activeUser => {
      res.render('update_profile', {activeUser})
    })
  })
  // Post request to update User profile
  router.post('/', (req, res) => {
    const user = req.body;
    const name = user.name;
    const password = user.password;
    const email = user.email
    const userID = req.session.userID;
    updateUser(userID, name, email, password)
      .then(result => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.redirect('/index')
      })
      .catch(e => res.send(e));
  });
  return router;
};



