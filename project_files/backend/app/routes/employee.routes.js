module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Retrieve Profile
  router.post("/profile", employees.getProfile);

  // Update Profile
  router.put("/profile", employees.updateProfile);

  // Check in Customer by booking id
  router.post("/checkin", employees.checkin);

  // Retrieve Customers List
  router.get("/customers", employees.getCustomers);

  // Create Customer
  router.post("/customer", employees.createCustomer);

  // Get Customer
  router.post("/getcustomer", employees.getCustomer);

  // Check out Customer by booking id after receiving payment -- recorded as service request
  router.post("/checkout", employees.checkout);

  // Retrieve all Bookings
  router.get("/bookings", employees.getbookings);

  // Retrieve a Bookings
  router.post("/booking", employees.getbooking);

  // Get Employee Service Requests
  router.post("/myservicerequests", employees.myservicerequests);

  // Get Available Service Requests
  router.get("/availableservicerequests", employees.availableservicerequests);

  // Accept Available Service Requests
  router.post("/acceptservicerequests", employees.acceptservicerequests);

  // Get Rooms info
  router.get("/checkedinroomsinfo", employees.checkedinroomsinfo);

  app.use('/api/employees', router);
};
