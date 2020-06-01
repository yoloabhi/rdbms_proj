/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servicetype', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'servicetype'
  });
};
