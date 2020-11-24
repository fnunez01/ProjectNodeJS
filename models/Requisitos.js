const Sequelize = require('sequelize');
const db = require('../config/db');
const Vacantes = require('./Vacantes');

const Requisitos = db.define('requisitos',{
    codigo:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    requisito: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});

Requisitos.belongsTo(Vacantes);

//Proyectos.hasMany(Tareas);

module.exports = Requisitos;

