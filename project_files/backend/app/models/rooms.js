/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'type_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'roomtypes',
        key: 'id'
      }
    },
    'name': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'booked': {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'disabled': {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'floor': {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'rooms'
  });
};
