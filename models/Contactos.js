const sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
const db = require('../config/db');

const contacto = db.define('contacto',{
    id_contacto:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombres_contacto:{
        type:sequelize.STRING(60),
        allowNull:false
    },
    email_contacto
    :{
        type:sequelize.STRING(30),
        allowNull:false
    },

    mensaje
    :{
        type:sequelize.STRING(2000),
        allowNull:false
    },
    
    url: sequelize.STRING
    
    
},{
    hooks:{
        beforeCreate:(contacto)=>{
            const url = slug(contacto.nombres_contacto).toLowerCase();
            contacto.url = `${url}-${shortid.generate()}`;
        }
    }

}

);
module.exports = contacto;