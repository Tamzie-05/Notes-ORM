const sequelize = require("sequelize");
const sequelize = require("../util/database");

const Customer = sequelize.define("customer",{
    id: {
        type: sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name: {
        type: sequelize.STRING,
        allowNull:false,
    },
    email: {
        type:sequelize.STRING,
        allowNull:false,
    },
});

module.exports = Customer;