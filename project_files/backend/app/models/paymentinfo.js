/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paymentinfo', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'cust_id': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null",
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    'number': {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      comment: "null"
    },
    'expiry': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'paymentinfo'
  });
};
