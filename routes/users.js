/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
<<<<<<< HEAD
  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users;`)
=======
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users`)
>>>>>>> ed03cd027e70eef33bd1ca56dee532fce9e50766
      .then(data => {
        const users = data.rows;
        res.send({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
