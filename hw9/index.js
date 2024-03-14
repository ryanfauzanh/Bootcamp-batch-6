const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const app = express();

const things = require("./routes/login.js");
const users = require("./routes/users.js");
const movies = require("./routes/movies.js");
const login = require("./routes/login.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(morgan("common"));

app.use("/things", things);
app.use("/users", users);
app.use("/users/delete/:id", users);
app.use("/users/update/:id", users);

app.use("/movies", movies);
app.use("/movies/create", movies);
app.use("/movies/delete/:id", movies);
app.use("/movies/update/:id", movies);

app.use("/register", users); // Corrected the endpoint to "/register"

app.use("/login", login);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
