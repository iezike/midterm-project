const express = require('express');
const router = express.Router();


// route to display homepage feed
module.exports = (db) => {
  const getResourceData = () => {
    console.log("/ route test here:")
    let resourceQuery = `SELECT title, description, topic, external_url, avg(rating) as average_rating
    FROM resources
    JOIN resource_reviews ON  resources.id = resource_id
    GROUP BY resources.id
    `;

    return db
      .query(resourceQuery)
  };
  router.get("/", (req, res) => {
    getResourceData()
    .then(results => {
      res.render('index', {results});
    })
  });
  return router;
}

const likeCounter = document.createElement("span")

fetch("http://localhost:8080/index")
  .then((resp) => resp.json())
  .then((currentLikeData) =>
    setLikeCounter(currentLikeData, id, likeCounter)
  );

  function setLikeCounter(currentLikeData, id, likeCounter) {
    const likedContent = currentLikeData.find(
      (element) => element["id"] === id.innerText
    );

    if(typeof likedContent === "undefined") {
      likeCounter.innerText = "0 likes";
    } else if (likedContent === 1) {
      likeCounter.innerText = "1 like";
    } else {
    likeCounter.innerText = `${likedContent["likes"]} likes`;
    }
  }
