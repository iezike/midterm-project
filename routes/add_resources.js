/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  const addResource = (owner_id, title, description, topic, external_url) => {
    const queryString = `INSERT INTO resources (owner_id, title, description, topic, external_url)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`

    // const queryParams = [owner_id, title, description, topic, external_url]

    return db.query(queryString, [owner_id, title, description, topic, external_url])
  }

  router.get('/add', (req, res) => {
    res.render('add_resources')
  })



  router.post('/add', (req, res) => {
    console.log(req.body);
    const resource = req.body;
    const owner = resource.owner_id;
    const title = resource.title;
    const description = resource.description;
    const url = resource.url;
    const topic = resource.topic;

    addResource(owner, title, description, topic, url)
      .then(result => {
        console.log(result.rows);
        return result.rows
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
