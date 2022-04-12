const express = require('express');
const login = require('./login');
const router = express.Router();


module.exports = (db) => {
  const getComments = (resourceId) => {
    const stringParams = ` SELECT comment, users.name, resource_id
    FROM resource_reviews
    JOIN users ON users.id = user_id
    WHERE resource_id = $1
    `
    return db.query(stringParams, [resourceId])
  }


  const getMyResources = (userID) => {
    let queryString = `
    SELECT DISTINCT resources.*, avg(rating) as rating
    FROM resources
    JOIN users ON owner_id = users.id
    JOIN favourites ON favourites.resource_id = resources.id
    JOIN resource_reviews ON resource_reviews.user_id = users.id
    WHERE favourites.user_id = $1
    AND LIKED IS true
    GROUP BY resources.id
    `;
    const queryParams = [userID];

    return db.query(queryString, queryParams);
  };

  router.get('/', (req, res) => {
    const owner = req.session.userID
    getMyResources(owner)
    .then(results => {
        res.render('my_favourites', {results});
      })
      // const templateVars = {info: results.rows}
      // console.log('jsdvfsdhvf', templateVars);
      
  });



  return router;
};


