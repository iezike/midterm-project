const express = require('express');
const { route } = require('express/lib/application');
const { get } = require('express/lib/response');
const res = require('express/lib/response');
const router = express.Router();


// Route to handle a user registeration form
module.exports = function (db) {
  const getLikes = (resourceLike) => {
    const stringParams = ` SELECT resource_id, like_count as likes
    FROM resource_reviews
    JOIN resources ON resources.id = resource_id
    WHERE resource_id = $1
    `;
    return db.query(stringParams, [resourceLike]).then(res => res.rows);
  };

  const getSingleRequest = (id) => {
    const queryString = `
    SELECT resources.*, avg(rating) as rating
    FROM resources
    LEFT JOIN resource_reviews ON resource_reviews.resource_id = resources.id
    WHERE resources.id = $1
    GROUP BY resources.id
    `;
    return db.query(queryString, [id]).then(res => res.rows);
  };

  const getComments = (resourceId) => {
    const stringParams = ` SELECT comment, users.name, resource_id
    FROM resource_reviews
    JOIN users ON users.id = user_id
    WHERE resource_id = $1
    ORDER BY resource_reviews.id DESC
    `;
    return db.query(stringParams, [resourceId]).then(res => res.rows);
  };



  const getSearchData = (text) => {
    let resourceQuery = `SELECT title, description, topic, external_url, avg(rating) as rating
    FROM resources
    LEFT JOIN resource_reviews ON  resources.id = resource_id
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

  router.get('/:resource_id', (req, res) => {
    let id = req.params.resource_id;
    let user = req.session.userID;
    let likes = req.params.like_count;
    // add like grab function inside here
    Promise
      .all([getSingleRequest(id), getComments(id), getLikes(likes), getUserName(user)])
      .then(([resultData, resultComments, resultLikes, activeUser]) => {
        const data = resultData[0];
        const comments = resultComments;
        const likes = resultLikes;
        res.render('test', { data, comments, likes, id, activeUser });
      });
  });

  return router;
}
