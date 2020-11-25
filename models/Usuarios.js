const sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const { Sequelize } = require('../config/db');


const usuarios = db.define('usuarios',{
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:sequelize.STRING(60),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El nombre no puede ir vacio'
            }
        }
    },

    apellido:{
        type:sequelize.STRING(60),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El apellido no puede ir vacío'
            }
        }
    },

    documento:{
        type:sequelize.STRING(20),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El documento no puede ir vacío'
            }
        }
    },

    direccion:{
        type:sequelize.STRING(60),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'la direccion no puede ir vacia'
            }
        }
    },

    telefono:{
        type:sequelize.STRING(20),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El telefono no puede ir vacío'
            }
        }
    },

    edad:{
        type:sequelize.TINYINT,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'la edad no puede ir vacío'
            }
        }
    },
    
    email:{
        type:sequelize.STRING(60),
        allowNull:false,
        validate:{
           isEmail:{
               msg:'Agrega un Email Válido' 
           },
           notEmpty:{
            msg:'El Email no puede ir vacío'
           }
        },
        unique:{
            args: true,
            msg:'Email ya esta Registrado!'
        }
    },
    
    
    titulo:{
        type:sequelize.STRING(60),
        allowNull: true,      
      
    },

    descripcion:{
        type:sequelize.STRING(80),
        allowNull: true,      
              
    },


    password:{
        type:sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg:'El password no puede ir vacío'
            }
        }

    },
    activo:{
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
            //console.log(usuario);
        }
    }

}
);

usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}


module.exports = usuarios;