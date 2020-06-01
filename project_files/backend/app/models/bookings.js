/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings', {
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
    'room_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    'startdate': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    },
    'enddate': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    },
    'coupon_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'coupons',
        key: 'id'
      }
    },
    'numguests': {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      comment: "null"
    },
    'paid': {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'cancelled': {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'checkedin': {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'checkedout': {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    }
  }, {
    tableName: 'bookings'
  });
};
