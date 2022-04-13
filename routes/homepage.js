const express = require('express');
const router = express.Router();


// route to display homepage feed
module.exports = (db) => {
  const getComments = (resourceId) => {
    const stringParams = ` SELECT comment, users.name, resource_id
    FROM resource_reviews
    JOIN users ON users.id = user_id
    WHERE resource_id = $1
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

  const increaseLikeCount = (resource_id) => {
    // const testParam = `SELECT * FROM resources WHERE id = $1`;
    const stringParams = `
  UPDATE resources
  SET like_count = like_count + 1
  WHERE id = $1
  `;
    return db.query(stringParams, [resource_id]).then(res => res.rows);
  };

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

  const getResourceData = () => {
    console.log("/ route test here:")
    let resourceQuery = `SELECT resources.*, avg(rating) as rating
    FROM resources
    JOIN resource_reviews ON  resources.id = resource_id
    GROUP BY resources.id
    `;
    return db
      .query(resourceQuery)
  };

  const getLikes = (resourceLike) => {
    const stringParams = ` SELECT resource_id, like_count as likes
    FROM resource_reviews
    JOIN resources ON resources.id = resource_id
    WHERE resource_id = $1
    `;
    return db.query(stringParams, [resourceLike]).then(res => res.rows);
  };

  // query to update likes like_count +1


  router.get("/", (req, res) => {
    getResourceData()
      .then(results => {
        res.render('index', { results });
      })
  });

  router.get('/:resource_id', (req, res) => {
    let id = req.params.resource_id;
    let user = req.session.userID;
    let likes = req.params.like_count;


    // add like grab function inside here
    Promise
      .all([getSingleRequest(id), getComments(id), getLikes(likes)])
      .then(([resultData, resultComments, resultLikes]) => {
        const data = resultData[0];
        const comments = resultComments;
        const likes = resultLikes;
        console.log('here', data);
        console.log('--------', comments);
        console.log("--------", likes);
        res.render('test', { data, comments, likes, id });
      });
  });

  router.post('/:resource_id', (req, res) => {
    console.log('+++++++++', req.body);
    const userID = req.session.userID;
    const resourceID = req.params.resource_id;
    const comment = req.body.comment;
    console.log('--------', resourceID);
    addComment(userID, resourceID, comment);
    res.redirect(`/index/${resourceID}`)
  });

  router.post('/update/:resource_id', (req, res) => {
    console.log('+++++++++', req.params.resource_id);
    const resourceID = req.params.resource_id;
    increaseLikeCount(resourceID)
      .then(results => {
        console.log('Results: ', results)
      })
    res.redirect(/index/)
  });

  return router;



}


