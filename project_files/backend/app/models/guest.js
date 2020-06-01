/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guest', {
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
    'name': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'idproof': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'guest'
  });
};
