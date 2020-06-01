const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
// app.use(express.static('public'));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HMS." });
});

require("./app/routes/customer.routes")(app);
require("./app/routes/employee.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/roomtypes.routes")(app);
require("./app/routes/room.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
