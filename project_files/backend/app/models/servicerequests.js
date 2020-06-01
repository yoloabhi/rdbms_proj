/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servicerequests', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'booking_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    'servicetype_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'servicetype',
        key: 'id'
      }
    },
    'assigned_to': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    'description': {
      type: DataTypes.STRING(400),
      allowNull: false,
      comment: "null"
    },
    'preferredtime': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'servicerequests'
  });
};
