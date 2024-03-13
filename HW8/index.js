var express = require("express");
var app = express();
var pool = require("./queries.js");

var things = require("./things.js");

app.use("/things", things);
// app.use("/actor", things);
// app.use("/films", things);
// app.use("/film/:id", things);
// app.use("/filme/:category", things);
app.use("/city", things);
// pool.connect((err, res) => {
//   console.log(err);
//   console.log(res);
// });

app.use("/countrys", things);

app.listen(3000);
