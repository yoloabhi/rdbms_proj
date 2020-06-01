const db = require("../models");
const Op = db.Sequelize.Op;
const generator = require('generate-password')
const clonedeep = require('lodash/cloneDeep')
exports.newemployee = (req, res) => {
  // Validate request
  if (!req.body.fname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
    var password = generator.generate({
        length: 8,
        numbers: true
    });
  const employee = {
    fname: req.body.fname,
    lname: req.body.lname,
    designation: req.body.designation,
    phone: req.body.phone,
    service_id: req.body.service_id
  };

  db.employee.create(employee)
      .then(data => {
          data.dataValues.password = password;
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Employee."
        });
      });
};


exports.createCustomer = (req, res) => {
    // Validate request
    if (!req.body.fname) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var password = generator.generate({
        length: 8,
        numbers: true
    });
    var id = 'test_'+ new Date().toISOString();
    const customer = {
        id: id,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        idproof: req.body.idproof,
        address: req.body.address,
        phone: req.body.phone,
        phone_ext: req.body.phone_ext
    };

    db.customer.create(customer)
        .then(data => {
            data.dataValues.password = password;
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
};

// Retrieve Customer from the database.
exports.getcustomer = (req, res) => {
    let id = req.body.id;
    db.customer.findByPk(id, {
        include: [
            {
                model: db.bookings,
                include: [
                    {
                        model: db.rooms
                    }
                ]
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roomtypes."
            });
        });
};

// Retrieve all Customers from the database.
exports.getcustomers = (req, res) => {
    db.customer.findAll({
        include: [
            {
                model: db.bookings,
                include: [
                    {
                        model: db.rooms
                    }
                ]
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roomtypes."
            });
        });
};


// Retrieve all Bookings from the database.
exports.getbooking = (req, res) => {
    db.bookings.findByPk(req.body.id, {
        include: [
            {
                model: db.customer
            },
            {
                model: db.rooms,
                include: [
                    {
                        model: db.roomtypes
                    }
                ]
            },
            {
                model: db.bills
            },
            {
                model: db.servicerequests,
                include: [
                    {
                        model: db.servicetype
                    },
                    {
                        model: db.employee
                    }
                ]
            },
            {
                model: db.guest
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roomtypes."
            });
        });
};

// Retrieve all Bookings from the database.
exports.getbookings = (req, res) => {
    db.bookings.findAll({
        include: [
            {
                model: db.customer
            },
            {
                model: db.rooms,
                include: [
                    {
                        model: db.roomtypes
                    }
                ]
            },
            {
                model: db.bills
            },
            {
                model: db.servicerequests,
                include: [
                    {
                        model: db.servicetype
                    },
                    {
                        model: db.employee
                    }
                ]
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roomtypes."
            });
        });
};
// Retrieve all Employees from the database.
exports.getemployees = (req, res) => {
  db.employee.findAll({
      include: [
          {
              model: db.servicetype
          }
      ]
  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving roomtypes."
        });
      });
};

// Retrieve Emloyee datafrom the database.
exports.getemployeee = (req, res) => {
    db.employee.findByPk(req.body.id, {
        include: [
            {
                model: db.servicetype
            },
            {
                model: db.servicerequests
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roomtypes."
            });
        });
};


// Retrieve all rooms  the database.
exports.getrooms = (req, res) => {
    db.rooms.findAll({
        include: [
            {
                model: db.roomtypes
            },
            {
                model: db.bookings,
                include: [
                    {
                        model: db.customer
                    },
                    {
                        model: db.guest
                    },
                    {
                        model: db.bills
                    },
                    {
                        model: db.servicerequests,
                        include: [
                            {
                                model: db.servicetype
                            },
                            {
                                model: db.employee
                            }
                        ]
                    }
                ]
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};
exports.createservicetypes = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const servicetype = {
        name: req.body.name
    };

    db.servicetype.create(servicetype)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Servicetype."
            });
        });
};


exports.newroom = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a db.rooms
    const room = {
        name: req.body.name,
        floor: req.body.floor,
        type_id: req.body.type_id
    };

    // Save db.rooms in the database
    db.rooms.create(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the db.rooms."
            });
        });
};

// Update a db.rooms by the id in the request
exports.updateroom = (req, res) => {
    const id = req.body.id;

    db.rooms.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Room was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with id=" + id
            });
        });
};
// Update a db.rooms by the id in the request
exports.updateemployee = (req, res) => {
    const id = req.body.id;

    db.employee.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating db.rooms with id=" + id
            });
        });
};


// Create and Save a new Roomtype
exports.newroomtype = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Roomtype
    const roomtype = {
        name: req.body.name,
        price: req.body.price
    };

    // Save Roomtype in the database
    db.roomtypes.create(roomtype)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Roomtype."
            });
        });
};

// Update a Roomtype by the id in the request
exports.updateroomtype = (req, res) => {
    const id = req.body.id;

    db.roomtypes.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Roomtype was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Roomtype with id=${id}. Maybe Roomtype was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Roomtype with id=" + id
            });
        });
};


exports.getsevicerequests = (req, res) => {
    db.servicerequests.findAll({
        include: [
            {
                model: db.bookings,
                include: [
                    {
                        model: db.rooms,
                        include: [
                            {
                                model: db.roomtypes
                            }
                        ]
                    },
                    {
                        model: db.customer
                    }
                ]
            },
            {
                model: db.employee,
                required: false
            },
            {
                model: db.servicetype,
                required: false
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Bookings with Customer id=" + id
            });
        });
};
