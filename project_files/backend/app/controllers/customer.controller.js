const db = require("../models");
const Op = db.Sequelize.Op;

exports.getProfile = (req, res) => {
  const id = req.body.id;
  db.customer.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Customer with id=" + id
        });
      });
};
exports.getpaymentinfo = (req, res) => {
  const id = req.body.id;
  db.paymentinfo.findAll({
    where: { cust_id: id }
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

exports.getbills = (req, res) => {
  const id = req.body.id;
  db.bills.findAll({
      include: [
          {
              model: db.bookings,
              where: {cust_id: id}
          },
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


exports.getbookings = (req, res) => {
    const id = req.body.id;
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
                model: db.bills,
                required: false
            },
            {
                model: db.guest,
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

exports.getservicetypes = (req, res) => {
    const id = req.body.id;
    db.servicetype.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Service Requests for Booking id=" + id
            });
        });
};

exports.getservicerequest = (req, res) => {
    const id = req.body.id;
    db.servicerequests.findAll({
        include: [
            {
                model: db.servicetype
            }
        ],
        where: { booking_id: id }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Service Requests for Booking id=" + id
            });
        });
};

exports.createservicerequest = (req, res) => {
    // Validate request
    if (!req.body.booking_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const servicerequest = {
        booking_id: req.body.booking_id,
        servicetype_id: req.body.servicetype_id,
        assigned_to: req.body.assigned_to,
        description: req.body.description,
        preferredtime: req.body.preferredtime
    };

    db.servicerequests.create(servicerequest)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
};
exports.cancelroom = (req, res) => {
    const id = req.body.id;
    var c = {cancelled: true};
    db.bookings.update(c, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Booking was cancelled successfully."
                });
            } else {
                res.send({
                    message: `Cannot cancel Room Booking with id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Booking with id=" + id
            });
        });
};


exports.checkout = (req, res) => {
    const id = req.body.id;
    var c = {checkedout: true};
    db.bookings.findByPk(id)
        .then(data => {
            if (data["paid"] === 0)
            {
                throw "Please Pay Bill First";
            }
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
exports.paybill = (req, res) => {
    const id = req.body.id;
    var c = {paid: true};
    db.bookings.update(c, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Paid bill successfully."
                });
            } else {
                res.send({
                    message: `Cannot Pay bill of Booking with id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error paying bill of Booking with id=" + id
            });
        });
};
exports.checkbookable = (req, res) => {
  // Validate request
  if (!req.body.startdate) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  db.rooms.findAll({include: [
      {
        model: db.roomtypes
      },
      {
        model: db.bookings,
        order: [ [ 'createdAt', 'DESC' ]],
        where: {
          [Op.or]: [
              {
                startdate: {
                  [Op.gte]: req.body.enddate
                }
              },
              {
                enddate: {
                  [Op.lte]: req.body.startdate
                }
              },
              {
                  cancelled: true
              },
              {
                  checkedout: true
              }
            ]
        },
        required:true
      },
  // ]})
    ], where: {
      disabled: 0
    }})
      .then(data => {
        // console.log(data);
          let idl = {'availablerooms': []};
          var i;
          for (i = 0; i < data.length; i++) {
              var r = {'room_id': data[i]["id"], 'name': data[i]["name"], 'price':data[i]["roomtype"].price, 'floor': data[i]['floor'], 'rtname': data[i]["roomtype"].name }
              idl['availablerooms'].push(r);
          }
          db.rooms.findAll({include: [
                  {
                      model: db.roomtypes
                  },
                  {
                      model: db.bookings,
                      order: [ [ 'createdAt', 'DESC' ]],
                      required:false
                  },
                  // ]})
              ], where: {
                  [Op.and]: [
                      {
                          [Op.or]: [
                              {booked: true},
                              {booked: false}
                          ]
                      },
                      {disabled: 0}
                  ]
              }})
              .then(data => {
                  console.log(data);
                  if(data.length === 0)
                  {
                      throw "No Rooms Available";
                  }
                  for (i = 0; i < data.length; i++) {
                      var r = {'room_id': data[i]["id"], 'name': data[i]["name"], 'price':data[i]["roomtype"].price, 'floor': data[i]['floor'], 'rtname': data[i]["roomtype"].name }
                      if( data[i]["bookings"].length === 0)
                      {
                          idl['availablerooms'].push(r);
                      }
                  }
                  if(idl.length === 0)
                  {
                      throw "No Rooms Available";
                  }
                  res.send(idl);
              })
              .catch(err => {
                  console.log("Some error occurred while retrieving rooms.");
                  res.send(err);
              });
        // res.send(data);
      })
      .catch(err => {
        console.log("Some error occurred while retrieving rooms.");
        res.send(err);
      });
};

async function checkbook (req, id) {
    let data = await db.rooms.findAll({include: [
            {
                model: db.bookings,
                order: [ [ 'createdAt', 'DESC' ]],
                where: {
                    [Op.or]: [
                        {
                            startdate: {
                                [Op.gte]: req.body.enddate
                            }
                        },
                        {
                            enddate: {
                                [Op.lte]: req.body.startdate
                            }
                        },
                        {
                            cancelled: true
                        },
                        {
                            checkedout: true
                        }
                    ]
                },
                required:true
            },
            // ]})
        ], where: {
            disabled: 0
        }});
    let data2 = await db.rooms.findAll({include: [
            {
                model: db.bookings,
                order: [ [ 'createdAt', 'DESC' ]],
                required:false
            },
            // ]})
        ], where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        {booked: true},
                        {booked: false}
                    ]
                },
                {disabled: 0}
            ]
        }});
    let flag = 0;
    for(x = 0; x<data.length; x++)
    {
        if(data[x].id === id)
        {
            flag = 1;
        }
    }
    if (flag===0) {
        for(x = 0; x<data2.length; x++)
        {
            if(data2[x].id === id && data2[x]["bookings"].length === 0)
            {
                flag = 1;
            }
        }
    }
    if (flag===0) {
        return false;
    }
    else
    {
        return true;
    }
}

exports.bookroom = async (req, res) => {
  // Validate request
  if (!req.body.cust_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
    const booking = {
        cust_id: req.body.cust_id,
        room_id: req.body.room_id,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        numguests: req.body.numguests,
        paid: req.body.paid,
        cancelled: req.body.cancelled,
        coupon_id: req.body.coupon_id
    };
  let dat = await checkbook(req, req.body.room_id);
  // console.log(dat)
    if (dat) {
        db.bookings.create(booking)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Customer."
                });
            });
    } else {
        res.status(500).send({
            message: "Room Not Available to book."
        });
    }
};

exports.createProfile = (req, res) => {
  // Validate request
  if (!req.body.fname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const customer = {
    id: req.body.id,
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
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};


exports.addpaymentinfo = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const paymentinfo = {
    cust_id: req.body.cust_id,
    number: req.body.number,
    expiry: req.body.expiry
  };

  db.paymentinfo.create(paymentinfo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the payment Method."
        });
      });
};


// Update a Roomtype by the id in the request
exports.updatepaymentinfo = (req, res) => {
    const id = req.body.id;

    db.paymentinfo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Payment Info was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Payment Info with id=${id}. Maybe Payment Info was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Payment Info with id=" + id
            });
        });
};


// Update a Roomtype by the id in the request
exports.updateProfile = (req, res) => {
  const id = req.body.id;
  console.log(req.body.id);

  db.customer.update(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully."
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


// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Roomtype.findAll({ where: condition })
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

// Find a single Roomtype with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Roomtype.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Roomtype with id=" + id
      });
    });
};

// Update a Roomtype by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Roomtype.update(req.body, {
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

// Delete a Roomtype with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Roomtype.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Roomtype was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Roomtype with id=${id}. Maybe Roomtype was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Roomtype with id=" + id
      });
    });
};

// // Delete all Customer from the database.
// exports.deleteAll = (req, res) => {
//   Roomtype.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Customer were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all roomtypes."
//       });
//     });
// };
//
// // find all published Roomtype
// exports.findAllPublished = (req, res) => {
//   Roomtype.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving roomtypes."
//       });
//     });
// };
