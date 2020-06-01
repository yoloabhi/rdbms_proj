const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.bills = require("./bills")(sequelize, Sequelize);
db.bookings = require("./bookings")(sequelize, Sequelize);
db.coupons = require("./coupons")(sequelize, Sequelize);
db.customer = require("./customer")(sequelize, Sequelize);
db.employee = require("./employee")(sequelize, Sequelize);
db.guest = require("./guest")(sequelize, Sequelize);
db.paymentinfo = require("./paymentinfo")(sequelize, Sequelize);
db.roomportalusers = require("./roomportalusers")(sequelize, Sequelize);
db.roomtypes = require("./roomtypes")(sequelize, Sequelize);
db.rooms = require("./rooms")(sequelize, Sequelize);
db.servicetype = require("./servicetype")(sequelize, Sequelize);
db.servicerequests = require("./servicerequests")(sequelize, Sequelize);
db.rooms.belongsTo(db.roomtypes, {
  foreignKey: 'type_id'
});
db.roomtypes.hasMany(db.rooms, {
  foreignKey: 'type_id'
});
db.paymentinfo.belongsTo(db.customer, {
  foreignKey: 'cust_id'
});
db.customer.hasMany(db.paymentinfo, {
  foreignKey: 'cust_id'
});
db.bookings.belongsTo(db.customer, {
  foreignKey: 'cust_id'
});
db.customer.hasMany(db.bookings, {
  foreignKey: 'cust_id'
});
db.bookings.belongsTo(db.rooms, {
  foreignKey: 'room_id'
});
db.rooms.hasMany(db.bookings, {
  foreignKey: 'room_id'
});
db.coupons.hasMany(db.bookings, {
  foreignKey: 'coupon_id'
});
db.guest.belongsTo(db.bookings, {
  foreignKey: 'booking_id'
});
db.bookings.hasMany(db.guest, {
  foreignKey: 'booking_id'
});
db.roomportalusers.belongsTo(db.bookings, {
  foreignKey: 'booking_id'
});
db.bookings.hasOne(db.roomportalusers, {
  foreignKey: 'booking_id'
});
db.bills.belongsTo(db.bookings, {
  foreignKey: 'booking_id'
});
db.bookings.hasOne(db.bills, {
  foreignKey: 'booking_id'
});
db.bills.belongsTo(db.paymentinfo, {
  foreignKey: 'payment_id'
});
db.paymentinfo.hasMany(db.bills, {
  foreignKey: 'payment_id'
});
db.servicerequests.belongsTo(db.bookings, {
  foreignKey: 'booking_id'
});
db.bookings.hasMany(db.servicerequests, {
  foreignKey: 'booking_id'
});
db.servicerequests.belongsTo(db.servicetype, {
  foreignKey: 'servicetype_id'
});
db.servicetype.hasMany(db.servicerequests, {
  foreignKey: 'servicetype_id'
});
db.servicerequests.belongsTo(db.employee, {
  foreignKey: 'assigned_to'
});
db.employee.hasMany(db.servicerequests, {
  foreignKey: 'assigned_to'
});
db.employee.belongsTo(db.servicetype, {
  foreignKey: 'service_id'
});
db.servicetype.hasMany(db.employee, {
  foreignKey: 'service_id'
});
module.exports = db;
