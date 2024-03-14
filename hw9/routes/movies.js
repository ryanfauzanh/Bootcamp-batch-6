/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      required:
 *        - title
 *        - genres
 *        - year
 *      properties:
 *        id:
 *          type: integer
 *          description: The id of the movie
 *        title:
 *          type: string
 *          description: The title of the movie
 *        genres:
 *          type: string
 *          description: The genres of the movie
 *        year:
 *          type: string
 *          description: The year that was the movie released
 *      example:
 *        id: 1
 *        title: Reckless
 *        genres: Comedy|Drama|Romance
 *        year: 2001
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The list of movies around the world
 * /movies:
 *  get:
 *    summary: Show 10 list of movies
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    response:
 *      200:
 *        description: The created movie.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      500:
 *        description: Some server error
 *  post:
 *    summary: Create a new movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    response:
 *      200:
 *        description: The created movie.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      400:
 *        description: Some client error
 *  put:
 *    summary: Update a spicified movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    response:
 *      200:
 *        description: Movie updated.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      400:
 *        description: Some client error
 *  delete:
 *    summary: Delete a specified movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    response:
 *      200:
 *        description: Movie deleted.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      500:
 *        description: Some server error
 */

require("dotenv").config();

const express = require("express");
const router = express.Router();
const pool = require("../queries.js");

const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let page, limit, offset;

router.get("/", (req, res) => {
  if (!req.body.token) {
    res.status(400).send({ message: "Bad Request" });
  }
  const data = jwt.verify(req.body.token, "koderahasia");
  page = parseInt(req.query.page);
  limit = parseInt(req.query.limit);
  offset = (page - 1) * limit;
  pool.query(
    `select * from movies order by id asc offset ${offset} limit ${limit}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      const films = result.rows;
      res.json({ user: data, films: films });
    }
  );
});

router.post("/create", (req, res) => {
  if (!req.body.token) {
    res.status(400).send({ message: "Bad Request" });
  }
  const data = jwt.verify(req.body.token, "koderahasia");
  if (!req.body.id || !req.body.title || !req.body.genres || !req.body.year) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    pool.query(
      `insert into movies (id, title, genres, year) values (${req.body.id}, '${req.body.title}', '${req.body.genres}', '${req.body.year}')`,
      (error, result) => {
        if (error) {
          throw error;
        }
        res.send({ message: "New Movie Created by User:", user: data });
      }
    );
  }
});

router.delete("/delete/:id", (req, res) => {
  if (!req.body.token) {
    res.status(400).send({ message: "Bad Request" });
  }
  const data = jwt.verify(req.body.token, "koderahasia");
  pool.query(
    `delete from movies where id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json({ message: `Delete Success id: ${req.params.id}`, user: data });
    }
  );
});

router.put("/update/:id", (req, res) => {
  if (!req.body.token) {
    res.status(400).send({ message: "Bad Request" });
  }
  const data = jwt.verify(req.body.token, "koderahasia");
  if (!req.body.title) {
    res.status(400);
    res.json({ message: "Bad Request" });
  }
  pool.query(
    `update movies set title = '${req.body.title}' where id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json({ message: `Update Success id: ${req.params.id}`, user: data });
    }
  );
});

module.exports = router;
