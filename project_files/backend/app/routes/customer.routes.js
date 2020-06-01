module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
  const employees = require("../controllers/employee.controller");

  var router = require("express").Router();

  // Retrieve Customer Profile
  router.post("/getprofile", customers.getProfile);

  // Retrieve Customer Profile
  router.post("/profile", customers.createProfile);

  // Update Customer Profile
  router.put("/profile", customers.updateProfile);

  // Book room
  router.post("/book", customers.bookroom);

  // Cancel Booking
  router.post("/cancel", customers.cancelroom);

  // check if bookable in selected range of date and returns available rooms
  router.post("/checkbookable", customers.checkbookable);

  // get all bookings
  router.post("/mybookings", customers.getbookings);
  //
  // get paymentinfo
  router.post("/paymentinfo", customers.getpaymentinfo);
  // get paymentinfo
  router.post("/addpaymentinfo", customers.addpaymentinfo);
  // get paymentinfo
  router.put("/paymentinfo", customers.updatepaymentinfo);

  // Get all Bills
  router.post("/bills", customers.getbills);

  // Checkout if bill paid
  router.post("/checkout", customers.checkout);

  // Pay bill
  router.post("/paybill", customers.paybill);

  // GEt all service request with booking id
  router.post("/servicerequest", customers.getservicerequest);

  // Create a service request
  router.post("/newservicerequest", customers.createservicerequest);

  // Get service types
  router.get("/servicetypes", customers.getservicetypes);

  app.use('/api/customer', router);
};
