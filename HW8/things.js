var express = require("express");
var router = express.Router();
var pool = require("./queries.js");

router.get("/city", function (req, res) {
  pool.query(
    `SELECT * FROM country ${
      req.query.limit ? "LIMIT " + req.query.limit : ""
    }`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.get("/countrys", (req, res) => {
  pool.query("SELECT * FROM country", (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// router.get("/films", (req, res) => {
//   pool.query("SELECT * FROM film", (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.json(result.rows);
//   });
// });

// router.get("/film/:id", (req, res) => {
//   pool.query(
//     `SELECT * FROM film WHERE film_id = ${req.params.id}`,
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.json(result.rows);
//     }
//   );
// });

// router.get("/films", (req, res) => {
//   pool.query("SELECT * FROM film", (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.json(result.rows);
//   });
// });

// router.get("/categorys", (req, res) => {
//   pool.query("SELECT * FROM category", (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.json(result.rows);
//   });
// });

// router.get("/filme/:category", (req, res) => {
//   pool.query(
//     `SELECT * FROM film JOIN film_category on film.film_id = film_category.film_id join category on film_category.category_id = category.category_id WHERE category.name ='${req.params.category}'`,
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.json(result.rows);
//       console.log(req.params.category);
//     }
//   );
// });

module.exports = router;
