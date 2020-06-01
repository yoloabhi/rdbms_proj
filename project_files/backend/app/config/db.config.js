module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "anmolsri150",
  DB: "hms_proj",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    useUTC: false, // for reading from database
  },
  timezone: '+05:30'
};
