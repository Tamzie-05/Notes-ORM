const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const notes = sequelize.define("notes",{
    id: {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model : "users",
                key: "id"
            }
        },
        category_id:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references:{
                model : 'categories',
                key : 'id'
            }
        }
});
module.exports = notes;