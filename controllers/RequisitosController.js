const { request } = require('express');
const Vacantes = require('../models/Vacantes');
const Requisitos = require('../models/Requisitos');

exports.agregarRequisito = async (request, response, next)=>{
    const vacantes = await Vacantes.findOne({where:{url:request.params.url}});
    //console.log(vacante);
    //console.log(request.body);

    const {requisito} = request.body;

    const estado = 0;

    const vacanteCodigo = vacantes.codigo;

    //Insertar
    const resultado = await Requisitos.create({requisito, estado, vacanteCodigo});

    if(!resultado){
        return next();
    }

    response.redirect(`/vacantes/${request.params.url}`);
}
exports.cambiarEstadoRequisito = async (request, response)=>{
    //Viene del click frontend
    const { codigo }=request.params;
    //viene de la base de datos
    const tarea = await Requisitos.findOne({where:{codigo}});

    let estado = 0;

    if(tarea.estado === estado){
        estado =1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    response.status(200).send('Actualizado..');
}

exports.eliminarRequisito = async(request, response)=>{
    //console.log(request.params);
    const { codigo }= request.params;
    //Eliminar
    const resultado = await Requisitos.destroy({where:{codigo}});

    if(!resultado) return next();

    response.status(200).send("Requisito Eliminado Correctamente");
}