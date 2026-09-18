const Sequelize = require("sequelize");
const sequelize = new Sequelize("notes","root","TamzieWairimu098#",{
    dialect:"mysql",
    host:"localhost",
});


module.exports = sequelize;