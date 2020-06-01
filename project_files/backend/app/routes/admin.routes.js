module.exports = app => {
  const admin = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  // Create a new Employee
  router.post("/employee", admin.newemployee);

  // Update a Employee
  router.put("/employee", admin.updateemployee);

  // Create a new service type
  router.post("/servicetype", admin.createservicetypes);

  // Retrieve all Employees
  router.get("/employees", admin.getemployees);

  // Create Customer
  router.post("/customer", admin.createCustomer);

  // Retrieve all Customers
  router.get("/customers", admin.getcustomers);

  // Retrieve Customer
  router.post("/getcustomer", admin.getcustomer);

  // Retrieve all Bookings
  router.post("/booking", admin.getbooking);

  // Retrieve all Bookings
  router.get("/bookings", admin.getbookings);

  // Retrieve all Service Requests
  router.get("/servicerequest", admin.getsevicerequests);

  // Retrieve Employee data
  router.post("/getemployee", admin.getemployeee);

  // Retrieve all rooms
  router.get("/getrooms", admin.getrooms);

  // New room
  router.post("/room", admin.newroom);

  // New room Type
  router.post("/roomtype", admin.newroomtype);

  // Update room
  router.put("/room", admin.updateroom);

  // Update room Type
  router.put("/roomtype", admin.updateroomtype);

  // // get discount coupons
  // router.get("/coupon", admin.getcoupons);
  //
  // // create discount coupons
  // router.post("/coupon", admin.createcoupons);

  app.use('/api/admin', router);
};
