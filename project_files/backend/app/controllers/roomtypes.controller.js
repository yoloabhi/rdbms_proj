const db = require("../models");
const Roomtype = db.roomtypes;
const Op = db.Sequelize.Op;

// // Create and Save a new Roomtype
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }
//
//   // Create a Roomtype
//   const roomtype = {
//     name: req.body.name,
//     price: req.body.price
//   };
//
//   // Save Roomtype in the database
//   Roomtype.create(roomtype)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Roomtype."
//       });
//     });
// };

// // Update a Roomtype by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;
//
//   Roomtype.update(req.body, {
//     where: { id: id }
//   })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Roomtype was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Roomtype with id=${id}. Maybe Roomtype was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Roomtype with id=" + id
//         });
//       });
// };

// Retrieve all Roomtypes from the database.
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
  const id = req.body.id;

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

// // Delete a Roomtype with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;
//
//   Roomtype.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Roomtype was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Roomtype with id=${id}. Maybe Roomtype was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Roomtype with id=" + id
//       });
//     });
// };

// // Delete all Roomtypes from the database.
// exports.deleteAll = (req, res) => {
//   Roomtype.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Roomtypes were deleted successfully!` });
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
