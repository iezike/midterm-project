const express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const router = express.Router();


// Route to handle a user registeration form
module.exports = function (db) {
  const getSearchData = (text) => {
    let resourceQuery = `SELECT title, description, topic, external_url, avg(rating) as average_rating
    FROM resources
    JOIN resource_reviews ON  resources.id = resource_id
    WHERE description LIKE $1 OR title LIKE $1 OR topic LIKE $1
    GROUP BY resources.id
    `;
    return db.query(resourceQuery, [`%${text}%`])
  };
  router.get('/', (req, res) => {
    res.render('search_resources')
  })
  router.post('/', (req, res) => {
    const keySearch = req.body.searchText;
    console.log(keySearch)
    getSearchData(keySearch)
    .then(results => {
      if (results.rows.length === 0){
        return res.status(403).send("No result found");
      }
      res.render('search_results', {results});
    })
  })
  return router;
}
