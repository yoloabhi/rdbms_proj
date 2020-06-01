const db = require("../models");
const Op = db.Sequelize.Op;
const { createInvoice } = require("../../createInvoice");
const generator = require('generate-password')
const clonedeep = require('lodash/cloneDeep')

exports.getProfile = (req, res) => {
  const id = req.body.id;
  db.employee.findByPk(id, {
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
          message: "Error retrieving Customer with id=" + id
        });
      });
};

// Update a Employee profile by the id in the request
exports.updateProfile = (req, res) => {
  const id = req.body.id;
  console.log(req.body.id);

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
          message: "Error updating Employee with id=" + id
        });
      });
};

exports.checkedinroomsinfo = (req, res) => {
    db.bookings.findAll({
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
        ], where: {
            [Op.and]: [
                {
                    checkedin: true
                },
                {
                    checkedout: false
                }
            ]
        }})
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

exports.availableservicerequests = (req, res) => {
    db.servicerequests.findAll({
        include: [
            {
                model: db.bookings,
                include: [
                    {
                        model: db.customer
                    },
                    {
                        model: db.rooms
                    }
                ]
            },
            {
                model: db.servicetype
            },
        ], where: {
            assigned_to: null
        }})
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
exports.acceptservicerequests = (req, res) => {
    var id = req.body.id;
    db.servicerequests.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Service Request was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Service Request with id=${id}. Maybe Employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Service Request with id=" + id
            });
        });
};
exports.myservicerequests = (req, res) => {
    db.servicerequests.findAll({
        include: [
            {
                model: db.bookings,
                include: [
                    {
                        model: db.customer
                    },
                    {
                        model: db.rooms
                    }
                ]
            },
            {
                model: db.servicetype
            },
        ], where: {assigned_to: req.body.id}})
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


exports.getCustomer = (req, res) => {
    let id = req.body.id;
    db.customer.findByPk(id, {
        include: [
            {
                model: db.bookings,
                required:false,
                include: [
                    {
                        model: db.rooms
                    }
                ]
            },
        ]})
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


exports.getCustomers = (req, res) => {
    db.customer.findAll({
        include: [
            {
                model: db.bookings,
                required:false
            },
        ]})
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

exports.checkout = (req, res) => {
    const id = req.body.id;
    var c = {checkedout: true, paid: true};
    db.bookings.findByPk(id)
        .then(data => {
            db.bookings.update(c, {
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        var tt = {
                            booked: false
                        };
                        db.rooms.update(tt, {
                            where: { id: data["room_id"]}
                        }).then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Checked out successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot Checkout Booking with id=${id}!`
                                });
                            }
                        }).catch(err => {
                            res.status(500).send({
                                message: "Error checking out Booking with id=" + id
                            });
                        });
                    } else {
                        res.send({
                            message: `Cannot Checkout Booking with id=${id}!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error checking out Booking with id=" + id
                    });
                });
            // res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + "! Error retrieving Booking with id=" + id
            });
        });

};

exports.checkin = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var b = {
    checkedin: true
  };

    var id = req.body.id;
    db.bookings.findByPk(req.body.id)
        .then(data => {
            console.log(data["checkedin"])
            if(data["checkedin"] === 1)
            {
                res.status(500).send({
                    message: "Already Checked In - Booking :" + id
                });
            }
            else
            {
                const up = {
                    booked: true
                }
                db.rooms.update(up, {
                    where: { id: data["room_id"] }
                }).then(num => {
                    if (num == 1) {
                        console.log(data);
                    } else {
                        console.log(`Cannot update Roomtype with id=${data["room_id"]}. Maybe Roomtype was not found or req.body is empty!`);
                    }
                })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Roomtype with id=" + id
                        });
                    });
                function guestfun(item, index) {
                    item["booking_id"] = id;
                    console.log(index, item);
                    db.guest.create(item)
                        .then(data => {
                            console.log("Guest created Successfully name:"+ item.name);
                        })
                        .catch(err => {
                            console.log(err.message || "Some error occurred while creating the Servicetype.");
                        });
                }
                db.guest.bulkCreate(req.body.guests)
                    .then(data => {
                        console.log("Guest created Successfully name:"+ item.name);
                    })
                    .catch(err => {
                        console.log(err.message || "Some error occurred while creating the Servicetype.");
                    });
                // req.body.guests.forEach(guestfun);
                db.bookings.update(b, {
                    where: { id: req.body.id }
                })
                    .then(num => {
                        if (num == 1) {
                            db.bookings.findByPk(id, {
                                include: [
                                    {
                                        model: db.customer,
                                        required:true
                                    },
                                    {
                                        model: db.rooms,
                                        required:true,
                                        include: [
                                            {
                                                model: db.roomtypes,
                                                required:false
                                            }
                                        ]
                                    }
                                ]})
                                .then(data => {
                                    console.log(data["enddate"]);
                                    var Difference_In_Time = data["enddate"].getTime() - data["startdate"].getTime();
                                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                    console.log(Difference_In_Days);
                                    const invoice = {
                                        shipping: {
                                            name: data["customer"]["fname"]+" "+data["customer"]["lname"],
                                            phone: data["customer"]["phone"],
                                            id: data["cust_id"],
                                            bookingid: data["id"],
                                            numguests: data["numguests"]
                                        },
                                        items: [
                                            {
                                                roomtype: data["room"]["roomtype"]["name"],
                                                roomnumber: data["room"]["name"],
                                                quantity: Difference_In_Days,
                                                amount: data["room"]["roomtype"]["price"]
                                            }
                                        ],
                                        subtotal: 6000,
                                        paid: 500,
                                        invoice_nr: 1234
                                    };
                                    createInvoice(invoice, "/public/invoices/"+data["customer"]["id"]+"_"+data["id"]+".pdf");
                                    const bill = {
                                        booking_id: data["id"],
                                        amount: data["room"]["roomtype"]["price"] * Difference_In_Days,
                                        pdf_download_url: 'invoices/'+data["customer"]["id"]+"_"+data["id"]+".pdf"
                                    };
                                    db.bills.create(bill)
                                        .then(data => {
                                            res.send("Checked In Successfully");
                                        })
                                        .catch(err => {
                                            res.status(500).send({
                                                message:
                                                    err.message || "Some error occurred while creating the Servicetype."
                                            });
                                        });
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: "Error retrieving Customer with id=" + id
                                    });
                                });

                        } else {
                            res.send({
                                message: `Cannot Check in Customer with Booking id=${req.body.id}. Maybe Booking was not found or does not exist!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error Checking in Customer with Booking id=" + req.body.id + "Error: "+err
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Booking with id=" + id
            });
            return;
        });
};
