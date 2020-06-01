/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roomportalusers', {
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
    'username': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'roomportalusers'
  });
};
