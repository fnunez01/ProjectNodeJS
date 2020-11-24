const { request } = require("express")
const Vacantes = require('../models/Vacantes');
const contactos = require('../models/Contactos');
const Requisitos = require('../models/Requisitos');
const slug = require('slug');
const { sync } = require("../config/db");



//paginas
exports.ProyectosHome = async (request, response)=>{


    //console.log(response.locals.usuarios);

    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    //console.log(vacantes);
    response.render('index',{
        nombrePagina:'Mi Trabajo',
        vacantes
    });
}

exports.ProyectosContacto = async (request, response)=>{
   
    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    response.render('contacto',{nombrePagina:'Contacto', vacantes});
}

exports.ProyectosNosotros = async (request, response)=>{
    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    response.render('nosotros',{nombrePagina:'Nosotros', vacantes});
}
exports.ProyectosServicios = async (request, response)=>{
    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    response.render('servicios',{nombrePagina:'Servicios', vacantes});
}

exports.formularioVacantes = async (request, response)=>{
    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    response.render('nuevaVacante', {
        nombrePagina:'Nueva vacante',
        vacantes
    });
};

exports.ProyectosVacantes = async (request, response)=>{
    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    //console.log(vacantes);
    response.render('vacante', {
        nombrePagina:'Vacante',
        vacantes
    })
}

exports.nuevaVacante = async (request, response) => {
    //(response.send("Enviaste el formulario correctamente");
    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    //console.log(request.body);
    const { codigo } = request.body;
    const { nombre } = request.body;
    const { categoria } = request.body;
    
    let errores = [];

    if(!codigo){
        errores.push({'texto':'Agrega un codigo '})
    } 

    if(!nombre){
        errores.push({'texto':'Agrega un nombre '})
    } 

    if(!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(nombre)){
        errores.push({'texto':'Solo se aceptan Letras A-Z, ni caracteres especiales'});

    }

    if(!categoria){
        errores.push({'texto':'Agrega un caracteristia '})
    } 

    if(errores.length>0){
        response.render('nuevaVacante',{
            nombrePagina:'nueva vacante',
            errores,
            vacantes

        })  
    }else{

        //console.log(slug(nombre).toLowerCase());
        const usuarioId = response.locals.usuarios.id;

        const vacante = await Vacantes.create({ 
            codigo: codigo,
            nombre: nombre, 
            categoria: categoria,
            usuarioId
        });
        response.redirect('/vacante');
    }
} 

exports.contacto = async (request, response) => {
    //(response.send("Enviaste el formulario correctamente");
    
    console.log(request.body);    
    const { txtNombres } = request.body;
    const { txtEmail } = request.body;
    const { txtMensaje } = request.body;
    

    let errores2 = [];

    if(!txtNombres){
        errores2.push({'texto':'Agrega un nombre '})
    } 

    if(!txtEmail){
        errores2.push({'texto':'Agrega un email '})
    } 

    if(!txtMensaje){
        errores2.push({'texto':'Agrega un Mensaje '})
    }   
    

    if(errores2.length>0){
        response.render('contacto',{
            nombrePagina:'Contacto',
            errores2
        })  
    }else{
        
        console.log(slug(txtNombres).toLowerCase());
        const contacto = await contactos.create({
            
            nombres_contacto: txtNombres,
            email_contacto: txtEmail,
            mensaje: txtMensaje,
            
            
        }).catch( e => { console.error(e) } );
        response.redirect('/');


    }
}
exports.VacanteporUrl= async (request, response, next)=>{
    
    const usuarioId = response.locals.usuarios.id;
    const vacantesPromise = await Vacantes.findAll({where:{usuarioId}});

    const vacantePromise = Vacantes.findOne(
        {
            where:{
                url:request.params.url
            }
        }
    );

    const[vacantes, vacante] = await Promise.all([vacantesPromise,vacantePromise]);
    
    // buscar requisito
    const requisitos = await Requisitos.findAll({
        where:{
            vacanteCodigo : vacante.codigo
        },
        //include: [{ model: Vacantes}]
    });
    
    //console.log(requisitos);
   
    if(!vacante) return next();

    // console.log('Listo');

    //response.send(proyecto);

    response.render('editarVacante', {
        nombrePagina: 'Editar vacantes',
        vacantes,
        vacante, //findOne -url
        requisitos
    })

}
exports.formularioEditar = async(request, response)=>{
    const usuarioId = response.locals.usuarios.id;
    const vacantesPromise = Vacantes.findAll({where:{usuarioId}});

    const vacantePromise = Vacantes.findOne(
        {
            where:{
                codigo:request.params.codigo
            }
        }
    );
    
    const[vacantes, vacante] = await Promise.all([vacantesPromise,vacantePromise]);

    response.render('nuevaVacante',{
        nombrePagina:'Editar Vacanteee',
        vacantes,
        vacante
    })
    
}
exports.editarVacante = async (request, response) =>{
    const usuarioId = response.locals.usuarios.id;
    const vacantes = await Vacantes.findAll({where:{usuarioId}});
    //response.send("Enviaste el Formulario Correctamente")
    //console.log(request.body);

    const { codigo } = request.body;
    const { nombre } = request.body;
    const { categoria } = request.body;

    let errores = [];

    if(!codigo){
        errores.push({'texto':'Agrega el codigo de la vacante'})
    }

    if(!nombre){
        errores.push({'texto':'Agrega el nombre de la vacante'})
    }

    if(!categoria){
        errores.push({'texto':'Agrega la categoría de la vacante'})
    }

    if(!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(nombre)){
        errores.push({'texto':'Solo se aceptan Letras A-Z, ni caracteres especiales'});
    }

    if(!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(categoria)){
        errores.push({'texto':'Solo se aceptan Letras A-Z, ni caracteres especiales'});
    }
    if(errores.length>0){
        response.render('nuevaVacante',{
            nombrePagina:'Nueva vacante',
            errores,
            vacantes
            
        })
    }else{
        
       //console.log(slug(nombre));
       await Vacantes.update(
        { codigo: codigo },
            {
                where:{codigo:request.params.codigo}
            }   
        );
        await Vacantes.update(
            { nombre: nombre },
            {
                where:{codigo:request.params.codigo}
            }   
        );
           
        await Vacantes.update(
            { categoria: categoria },
            {
                where:{codigo:request.params.codigo}
            }
        );
        
       response.redirect('/vacante');
        
    }
}
exports.eliminarVacante = async(request,response, next)=>{
    const {urlVacante} = request.query;
    const resultado = await Vacantes.destroy({where:{url:urlVacante}});
    if(!resultado){
        return next();
    }
    response.status(200).send('Vacante eliminada correctamente!');
}