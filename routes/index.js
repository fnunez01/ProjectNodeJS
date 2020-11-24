const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ProyectosController = require('../controllers/ProyectosController');
const RequisitosController = require('../controllers/RequisitosController');
const UsuariosController = require('../controllers/UsuariosController');
const authController= require('../controllers/authController');

module.exports = function () {
    //home
    router.get('/', authController.usuarioAutenticado, ProyectosController.ProyectosHome);
    //nosotros
    router.get('/nosotros', authController.usuarioAutenticado, ProyectosController.ProyectosNosotros);
    //servicios
    router.get('/servicios', authController.usuarioAutenticado, ProyectosController.ProyectosServicios);
    //contacto
    router.get('/contacto', authController.usuarioAutenticado, ProyectosController.ProyectosContacto);  
    //Nueva vacante Get
    router.get('/nuevaVacante', authController.usuarioAutenticado, ProyectosController.formularioVacantes);
    //Vacante
    router.get('/vacante', authController.usuarioAutenticado, ProyectosController.ProyectosVacantes);
    //Nueva Vacante Post
    router.post('/nuevaVacante', authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    ProyectosController.nuevaVacante);
   //contacto Post
    router.post('/contacto', authController.usuarioAutenticado,
    body('txtNombres').not().isEmpty().trim().escape(),
    body('txtEmail').not().isEmpty().trim().escape(),
    body('txtMensaje').not().isEmpty().trim().escape(),    
    ProyectosController.contacto);
    //Listar proyectos
    router.get('/vacantes/:url', authController.usuarioAutenticado, ProyectosController.VacanteporUrl);
    //Ruta de edicion 
    router.get('/vacante/editar/:codigo', authController.usuarioAutenticado, ProyectosController.formularioEditar);
    //Editar la vacante
    router.post('/nuevaVacante/:codigo', authController.usuarioAutenticado, ProyectosController.editarVacante);
    //Eliminar vacante
    router.delete('/vacantes/:url', authController.usuarioAutenticado, ProyectosController.eliminarVacante);
    //crear metodo para insercion de requisitos
    router.post('/vacantes/:url', authController.usuarioAutenticado, RequisitosController.agregarRequisito);
    // crear el motodo para cambiar el estado del requisito
    router.patch('/requisitos/:codigo', authController.usuarioAutenticado, RequisitosController.cambiarEstadoRequisito);
    //Crear el método de eliminar el requisito
    router.delete('/requisitos/:codigo', authController.usuarioAutenticado, RequisitosController.eliminarRequisito);
   //crear el formulario de Inciar sesión
    router.get('/iniciar-sesion', UsuariosController.formIniciarSesion);
    //crear el formulario de perfil
    router.get('/perfil', authController.usuarioAutenticado, UsuariosController.formPerfil);
    //Editar la vacante
    router.post('/perfil/:id', authController.usuarioAutenticado, UsuariosController.editarPerfil);
    // Post Login
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    //Cerrar sesión
    router.get('/cerrar-sesion', authController.cerrarSesion);
    //restablecer password
    router.get('/restablecer', UsuariosController.formRestablecerPassword);
    router.post('/restablecer', authController.enviarToken);
    router.get('/restablecer', authController.resetPassword);
    //Método de Crear Cuenta
    router.get('/crear-cuenta', UsuariosController.formCrearCuenta);
    //Metodo de inserción crear cuenta
    router.post('/crear-cuenta',
    body('txtNombre').not().isEmpty().trim().escape(),
    body('txtApellido').not().isEmpty().trim().escape(),
    body('txtDocumento').not().isEmpty().trim().escape(),
    body('txtDireccion').not().isEmpty().trim().escape(),
    body('txtTelefono').not().isEmpty().trim().escape(),
    body('txtEdad').not().isEmpty().trim().escape(),
    body('txtCorreo').not().isEmpty().trim().escape(),
    body('txtUsuario').not().isEmpty().trim().escape(),
    body('txtPassword').not().isEmpty().trim().escape(),
    UsuariosController.crearCuenta);    
    return router;
}

