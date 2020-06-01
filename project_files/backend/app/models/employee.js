/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'fname': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'lname': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'designation': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'service_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'servicetype',
        key: 'id'
      }
    },
    'phone': {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'employee'
  });
};
