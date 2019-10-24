const { Sequelize, Model, DataTypes } = require('sequelize');
const conection = new Sequelize('testenode', 'root', '',{
    host: 'localhost',
    dialect: 'mariadb'
});

module.exports = conection;


