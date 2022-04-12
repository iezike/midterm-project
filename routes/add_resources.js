/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = (db) => {
  const addResource = (owner_id, title, description, topic, external_url) => {
    const queryString = `INSERT INTO resources (owner_id, title, description, topic, external_url)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    return db.query(queryString, [owner_id, title, description, topic, external_url]);
  };

  router.get('/add', (req, res) => {
    res.render('add_resources');
  });



  router.post('/add', (req, res) => {
    const resource = req.body;
    const title = resource.title;
    const description = resource.description;
    const url = resource.url;
    const topic = resource.topic;
    const owner = req.session.userID;

    addResource(owner, title, description, topic, url)
      .then(result => {
        console.log('are you my answer', result.rows[0]);
        // return result.rows[0];
        res.redirect('/')
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
