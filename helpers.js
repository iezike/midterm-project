const getUserByEmail = function (email, password, db) {
  const queryStringEmail = `SELECT *
  FROM users
  WHERE email = $1
  AND password = $2`
  const values = [email, password]
  return db
    .query(queryStringEmail, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// const getUserId = function (email, db) {
//   const queryStringEmail = `SELECT id
//   FROM users
//   WHERE email = $1
//   `
//   const values = [email]
//   return db
//     .query(queryStringEmail, values)
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

module.exports = {
  getUserByEmail,
  // getUserId
}

