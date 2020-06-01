/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bills', {
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
    'payment_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'paymentinfo',
        key: 'id'
      }
    },
    'amount': {
      type: "DOUBLE",
      allowNull: false,
      comment: "null"
    },
    'pdf_download_url': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'bills'
  });
};
