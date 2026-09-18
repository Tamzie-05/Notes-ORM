const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const categories = sequelize.define("categories",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports = categories;