const sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
const db = require('../config/db');
const usuarios = require('./Usuarios');

const vacantes = db.define('vacantes',{
    codigo:{
        type:sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:sequelize.STRING(60),
        allowNull:false
    },
    categoria:{
        type:sequelize.STRING(60),
        allowNull:false
    },
    url: sequelize.STRING
},{
    hooks:{
        beforeCreate(vacante){
            const url = slug(vacante.nombre).toLowerCase();
            vacante.url = `${url}-${shortid.generate()}`;
        }
    }

}
);

vacantes.belongsTo(usuarios);
module.exports = vacantes;