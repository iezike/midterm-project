const express = require('express');
const router = express.Router();


// route to display homepage feed
module.exports = (db) => {
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

  const increaseLikeCount = (resource_id) => {
    const stringParams = `
  UPDATE resources
  SET like_count = like_count + 1
  WHERE id = $1
  RETURNING *
  `;
    return db.query(stringParams, [resource_id]).then(res => {
      return res.rows;
    });
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

  const getResourceData = () => {
    console.log("/ route test here:");
    let resourceQuery = `SELECT resources.*, avg(rating) as rating
    FROM resources
    LEFT JOIN resource_reviews ON  resources.id = resource_id
    GROUP BY resources.id
    ORDER BY resources.id DESC
    `;
    return db
      .query(resourceQuery);
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
    });
  };

  router.get("/", (req, res) => {
    getUserName(req.session.userID)
      .then(activeUser => {
        getResourceData()
          .then(results => {
            res.render('index', { results, activeUser });
          });
      });
  });

  const getLikes = (resourceLike) => {
    const stringParams = ` SELECT resource_id, like_count as likes
    FROM resource_reviews
    JOIN resources ON resources.id = resource_id
    WHERE resource_id = $1
    `;
    return db.query(stringParams, [resourceLike]).then(res => res.rows);
  };

  // query to update likes like_count +1



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

  router.post('/:resource_id', (req, res) => {
    const userID = req.session.userID;
    const resourceID = req.params.resource_id;
    const comment = req.body.comment;
    addComment(userID, resourceID, comment);
    res.redirect(`/index/${resourceID}`);
  });

  router.post('/update/:resource_id', (req, res) => {
    const resourceID = req.params.resource_id;
    increaseLikeCount(resourceID)
      .then(results => {
        res.json({ results });
      });
  });

  return router;



};


