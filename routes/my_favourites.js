const express = require('express');
const { user } = require('pg/lib/defaults');
const login = require('./login');
const router = express.Router();


module.exports = (db) => {
  const addRating = (user_id, resource_id, rating) => {
    const queryString = `
  INSERT INTO resource_reviews (user_id, resource_id, rating)
  VALUES ($1, $2, $3)
  RETURNING *
    `;
    return db.query(queryString, [user_id, resource_id, rating]).then(res => res.rows)
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

  const addComment = (user_id, resource_id, comment) => {
    const stringParams = `
  INSERT INTO resource_reviews (user_id, resource_id, comment)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
    return db.query(stringParams, [user_id, resource_id, comment]).then(res => res.rows);
  };

  // const getUserName = (userId) => {
  //   const queryString = `
  //   SELECT name
  //   FROM users
  //   WHERE id = $1
  //   `;
  //   return db.query(queryString, [userId]);
  // };

  const getSingleRequest = (id) => {
    const queryString = `
    SELECT resources.*, avg(rating) as rating
    FROM resources
    JOIN resource_reviews ON resource_reviews.resource_id = resources.id
    WHERE resources.id = $1
    GROUP BY resources.id
    `;
    return db.query(queryString, [id]).then(res => res.rows);
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
    const owner = req.session.userID;
    Promise
    .all(([getUserName(owner),getMyResources(owner)]))
    .then(([activeUser, results]) =>{
      res.render('my_favourites', { results, activeUser});
    })
  });
  router.get('/:resource_id', (req, res) => {
    let id = req.params.resource_id;
    let user = req.session.userID;
    console.log('id id:', id);
    Promise
      .all([getSingleRequest(id), getComments(id), getUserName(user)])
      .then(([resultData, resultComments, activeUser]) => {
        console.log('resultdata', resultData);
        const data = resultData[0];
        const comments = resultComments;
        console.log('here', data);
        console.log('--------', comments);
        res.render('test', { data, comments, id, activeUser });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:resource_id', (req, res) => {
    console.log('+++++++++', req.body);
    const userID = req.session.userID;
    const resourceID = req.params.resource_id;
    const comment = req.body.comment;
    const rating = req.body.rating;
    console.log('--------', rating);
    Promise
    .all([addComment(userID, resourceID, comment),
    addRating(userID, resourceID, rating)])
    .then(([resComment, resRating]) => {
      console.log('*********',resComment[0].comment);
      if (resComment[0].comment === '') {
        return res.status(400).send('please enter some text')
      }
      res.redirect(`/favourites/${resourceID}`);
     return resComment, resRating

    })
  });



  return router;
};


