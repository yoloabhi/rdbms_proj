/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('coupons', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'discountpercent': {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      comment: "null"
    },
    'validity': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'coupons'
  });
};
