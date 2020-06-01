/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    'id': {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'phone_ext': {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      comment: "null"
    },
    'phone': {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "null"
    },
    'fname': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'lname': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'idproof': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'address': {
      type: DataTypes.STRING(90),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'customer'
  });
};
