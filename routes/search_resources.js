const express = require('express');
const { route } = require('express/lib/application');
const { get } = require('express/lib/response');
const res = require('express/lib/response');
const router = express.Router();


// Route to handle a user registeration form
module.exports = function (db) {
  const getSearchData = (text) => {
    let resourceQuery = `SELECT title, description, topic, external_url, avg(rating) as rating
    FROM resources
    JOIN resource_reviews ON  resources.id = resource_id
    WHERE description LIKE $1 OR title LIKE $1 OR topic LIKE $1
    GROUP BY resources.id
    `;
    return db.query(resourceQuery, [`%${text}%`])
  };
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
        res.render('search_resources', { activeUser })
      })
  })

  router.post('/', (req, res) => {
    const keySearch = req.body.searchText;
    const user = req.session.userID;
    getUserName(user)
      .then(activeUser => {
        getSearchData(keySearch)
          .then(results => {
            if (results.rows.length === 0) {
              return res.status(403).send("No result found");
            }
            res.render('search_results', { results, activeUser });
          })
      })
  })
  return router;
}
