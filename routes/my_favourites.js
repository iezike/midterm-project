const express = require('express');
const router = express.Router();


module.exports = (db) => {
  const getMyResources = (userID) => {
    let queryString = `
    SELECT DISTINCT resources.*, avg(rating) as average_rating
    FROM resources
    JOIN users ON owner_id = users.id
    JOIN favourites ON favourites.resource_id = resources.id
    JOIN resource_reviews ON resource_reviews.user_id = users.id
    WHERE favourites.user_id = $1
    AND LIKED IS true
    group by resources.id
    `;
    const queryParams = [userID];

    return db.query(queryString, queryParams);
  };

  router.get('/', (req, res) => {
    const owner = req.session.userID
    getMyResources(owner)
    .then(results => {
      // console.log(' does this work',results.rows);
      const templateVars = {info: results.rows}
      console.log('jsdvfsdhvf', templateVars);
      res.render('my_favourites', templateVars);
      })
  });

  // router.post('/', (req, res) => {
  //   const owner = req.session.userID
  //   getMyResources(owner)
  //   .then(result => {
  //     console.log(result.rows[0]);
  //     res.send({result})
  //   })

  return router;
};


