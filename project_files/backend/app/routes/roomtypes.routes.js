module.exports = app => {
  const roomtypes = require("../controllers/roomtypes.controller.js");

  var router = require("express").Router();
  //
  // // Create a new Roomtype
  // router.post("/", roomtypes.create);

  // Retrieve all Roomtypes
  router.get("/", roomtypes.findAll);

  // Retrieve a single Roomtype with id
  router.get("/", roomtypes.findOne);
  //
  // // Update a Roomtype with id
  // router.put("/:id", roomtypes.update);
  //
  // // Delete a Roomtype with id
  // router.delete("/:id", roomtypes.delete);

  // // Create a new Roomtype
  // router.delete("/", roomtypes.deleteAll);

  app.use('/api/roomtypes', router);
};
