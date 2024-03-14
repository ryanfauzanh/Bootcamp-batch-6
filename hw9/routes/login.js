// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *    Login:
//  *      type: object
//  *      required:
//  *        - email
//  *        - password
//  *      properties:
//  *        email:
//  *          type: string
//  *          description: The email of a user used for generating token
//  *        password:
//  *          type: string
//  *          description: The password of a user used for generating token
//  *      example:
//  *        email: oainger0@craigslist.org
//  *        password: KcAk6Mrg7DRM
//  */

// /**
//  * @swagger
//  * tags:
//  *  name: Login
//  *  description: Get a token used for authenticate and authorize a user
//  * /login:
//  *  post:
//  *    summary: Generated a token for a user
//  *    tags: [Login]
//  *    requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/Login'
//  *    response:
//  *      200:
//  *        description: Token generated.
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Login'
//  *      500:
//  *        description: Some server error
//  */

require("dotenv").config();

const express = require("express");
const router = express.Router();
const pool = require("../queries.js");

const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({ message: "Bad Request" });
  }
  pool.query(
    `select * from users where email = '${req.body.email}' and password = '${req.body.password}'`,
    (error, result) => {
      console.log(req.body);
      if (
        result.rows[0].email != req.body.email &&
        result.rows[0].password != req.body.password
      ) {
        res.status(400).json({ message: "Email or Password is invalid" });
      } else {
        const token = jwt.sign(
          {
            email: req.body.email,
            password: req.body.password,
          },
          "koderahasia",
          { expiresIn: "1h" }
        );
        res.json({
          token: token,
        });
        console.log(token);
      }
    }
  );
});

module.exports = router;
