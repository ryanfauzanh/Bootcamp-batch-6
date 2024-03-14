/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - gender
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: integer
 *          description: The id of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        gender:
 *          type: string
 *          description: The gender of the user
 *        password:
 *          type: string
 *          description: The password the user
 *      example:
 *        id: 1
 *        email: oainger0@craigslist.org
 *        gender: Female
 *        password: KcAk6Mrg7DRM
 *        role: Construction Worker
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The list of users
 * /users:
 *  get:
 *    summary: Show 10 list of users
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    response:
 *      200:
 *        description: The created movie.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some server error
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    response:
 *      200:
 *        description: The created user.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Some client error
 *  put:
 *    summary: Update a spicified user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    response:
 *      200:
 *        description: User updated.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Some client error
 *  delete:
 *    summary: Delete a specified user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    response:
 *      200:
 *        description: User deleted.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
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
    `select * from users order by id asc offset ${offset} limit ${limit}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      const users = result.rows;
      res.json({ user: data, users: users });
    }
  );
});

router.post("/register", (req, res) => {
  if (
    !req.body.id ||
    !req.body.email ||
    !req.body.gender ||
    !req.body.password ||
    !req.body.role
  ) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    pool.query(
      `insert into users (id, email, gender, password, role) values (${req.body.id}, '${req.body.email}', '${req.body.gender}', '${req.body.password}', '${req.body.role}')`,
      (error, result) => {
        if (error) {
          throw error;
        }
        res.send({ message: "Registration Complete" });
      }
    );
  }
});

router.delete("/delete/:id", (req, res) => {
  pool.query(
    `delete from users where id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json({ message: `Delete Success id: ${req.params.id}` });
    }
  );
});

router.put("/update/:id", (req, res) => {
  if (!req.body.email) {
    res.status(400);
    res.json({ message: "Bad Request" });
  }
  pool.query(
    `update users set email = '${req.body.email}' where id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json({ message: `Update Success id: ${req.params.id}` });
    }
  );
});

module.exports = router;
