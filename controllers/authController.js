const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos Son Obligatorios!'
});

exports.usuarioAutenticado = (request, response, next)=>{
    if(request.isAuthenticated()){
        return next();
    }

    return response.redirect('/iniciar-sesion');
}

exports.cerrarSesion = (request, response)=>{
    request.session.destroy(()=>{
        response.redirect('/');
    });

}

exports.enviarToken = async (request, response)=>{    
   const usuarios = await Usuarios.findOne({where:{email:request.body.email}})
   if(!usuarios){
       request.flash('error','No existe esta cuenta');
       response.render('restablecer',{
        nombrePagina:'restablecer Password',
        mensajes:request.flash()
    });       
   }
   //enviar token
   usuarios.token = crypto.randomBytes(20).toString('hex');
   //console.log(token)
   usuarios.expiracion = Date.now()+3600000;

   await usuarios.save();
   const resetUrl=`http://${request.headers.host}/restablecer/${usuarios.token}` ;  

}
exports.resetPassword = async (request, response)=>{
    response.json(request.params.token);
}