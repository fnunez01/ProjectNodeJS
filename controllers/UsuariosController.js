const { request } = require("express");
const Usuarios = require('../models/Usuarios');
const slug = require('slug');

exports.formCrearCuenta =(request, response)=>{
    response.render('Registro',{
        nombrePagina:'Crear Cuenta Plataforma'
    });
}

exports.formIniciarSesion = (request, response)=>{
    //response.send('Funciona!!!!!!!!');
   const { error }= response.locals.mensajes;

   response.render('Login',{
        nombrePagina:'Iniciar Sesión Plataforma',
        error
   });

}

exports.formPerfil = async (request, response)=>{
   //response.send('Funciona!!!!!!!!');
   const id = response.locals.usuarios.id;   
   const usuarios = await Usuarios.findOne({where:{id}}); 
   
   console.log(usuarios);


  response.render('Perfil',{
       nombrePagina:'Perfil',
       usuarios
       
       
  });

}




exports.crearCuenta = async (request, response)=>{
    console.log(request.body);
    const { txtNombre } = request.body;
    const { txtApellido } = request.body;
    const { txtDocumento } = request.body;
    const { txtDireccion } = request.body;
    const { txtTelefono } = request.body;
    const { txtEdad } = request.body;
    const { txtCorreo } = request.body;    
    const { txtPassword } = request.body;

    try {
     await Usuarios.create({
        nombre: txtNombre,
        apellido: txtApellido,
        documento: txtDocumento,
        direccion: txtDireccion,
        telefono: txtTelefono,
        edad: txtEdad,
        email: txtCorreo,        
        password: txtPassword
      });
      response.redirect('/iniciar-sesion');
   } catch (error) {
      request.flash('error', error.errors.map(error => error.message));
      response.render('registro',{
         mensajes: request.flash(),
         nombrePagina:'Crear Cuenta Plataforma',
         nombre: txtNombre,
         apellido: txtApellido,
         documento: txtDocumento,
         direccion: txtDireccion,
         telefono: txtTelefono,
         edad: txtEdad,
         email: txtCorreo,         
         password: txtPassword
      })
     console.log(error);
   }

}


exports.editarPerfil = async (request, response) =>{
   const id = response.locals.usuarios.id;
   const usuarios = await Usuarios.findOne({where:{id}});   
   console.log(usuarios);
   console.log(request.body);
   
   const { nombre } = request.body;
   const { apellido } = request.body;
   const { documento } = request.body;   
   const { telefono } = request.body;
   const { direccion } = request.body;
   const { titulo } = request.body;
   const { descripcion } = request.body;

   let errores = [];  
   if(errores.length>0){
       response.render('perfil',{
           nombrePagina:'perfil',
           errores,
           usuarios           
       })
   }else{
       
      console.log(slug(nombre));
      console.log(id)
      await Usuarios.update(
       { nombre: nombre },
           {
               where:{id:request.params.id}
           }   
       );
       await Usuarios.update(
       { apellido: apellido },
           {
               where:{id:request.params.id}
           }   
       );
          
       await Usuarios.update(
           { documento: documento },
           {
               where:{id:request.params.id}
           }
       );
       await Usuarios.update(
           { telefono: telefono },
           {
             where:{id:request.params.id}
           }
       );
       await Usuarios.update(
           { direccion: direccion },
           {
            where:{id:request.params.id}
           }
       );
       await Usuarios.update(
           { titulo: titulo },
           {
                 where:{id:request.params.id}
           }   
       );
       await Usuarios.update(
           { descripcion: descripcion },
           {
                 where:{id:request.params.id}
           }   
         );

       
      response.redirect('/');
       
   }
}

exports.formRestablecerPassword = (request, response)=>{
   response.render('restablecer',{
      nombrePagina: 'Restablecer tu Password'
   })
}