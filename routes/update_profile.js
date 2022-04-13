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
  router.get('/', (req, res) => {
    res.render('update_profile')
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



