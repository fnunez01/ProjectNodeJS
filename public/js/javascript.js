var  formulario, nombre, apellido, correo, telefono, usuario, password, expresiones, respuesta, boton;

var lista=['INSERT','SELECT','DELETE','UPDATE','DROP','CREATE','%','/','VIEW', 'DROP DATABASE'];


formulario = document.getElementById('idFormulario');
nombre = document.getElementById('idNombre');
apellido = document.getElementById('idApellido');
documento = document.getElementById('idDocumento');
direccion = document.getElementById('idDireccion');
telefono = document.getElementById('idTelefono');
edad = document.getElementById('idEdad');
correo = document.getElementById('idCorreo');
usuario = document.getElementById('idUsuario');
password = document.getElementById('idPassword');
respuesta = document.getElementById('idRespuesta');
boton = document.getElementById('idBoton');


const expresionesR = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


$("#idBoton").click(function(){
    validar();
   
})

function validar(){     
    
    respuesta.innerHTML = "";

    // VALIDACIONES NULL
    
    if(nombre.value === ""){
        
        nombre.focus();
        nombre.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
        ¡ERROR! LOS NOMBRES ESTAN VACIOS
         </div>
         `
    }

    else if(apellido.value === ""){
        apellido.focus();
        
        apellido.style.borderColor="red";

        respuesta.innerHTML = `
            <div class="alert alert-danger role="alert">
                ¡ERROR!  LOS APELLIDOS ESTAN VACIOS
            </div>
        `
    }

    else if(documento.value === ""){
        documento.focus();
        
        documento.style.borderColor="red";

        respuesta.innerHTML = `
            <div class="alert alert-danger role="alert">
                ¡ERROR!  EL DOCUMENTO ESTA VACIO
            </div>
        `
    }

    else if(direccion.value === ""){
        direccion.focus();
        
        direccion.style.borderColor="red";

        respuesta.innerHTML = `
            <div class="alert alert-danger role="alert">
                ¡ERROR!  LA DIRECCIÓN ESTA VACIA
            </div>
        `
    }

    else if(telefono.value === ""){
      
        telefono.focus();
        telefono.style.borderColor="red";

        respuesta.innerHTML = `
            <div class="alert alert-danger role="alert">
                ¡ERROR!  EL TELEFONO ESTA VACIO
            </div>
        `
    }

    else if(edad.value === ""){
      
        edad.focus();
        edad.style.borderColor="red";

        respuesta.innerHTML = `
            <div class="alert alert-danger role="alert">
                ¡ERROR!  COMPLETE LA EDAD
            </div>
        `
    }

    
    else if(correo.value === ""){
      
        correo.focus();
        correo.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL CORREO ESTA VACIO
        </div>
        `
    }

    //VALIDACION CON EXPRESIONES REGULARES

    else if(!expresionesR.correo.exec(correo.value)){

        
        correo.focus();
        correo.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL CORREO NO ES VALIDO
        </div>
        `
    }  

    else if(!expresionesR.usuario.exec(usuario.value)){

        
        usuario.focus();
        usuario.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL USUARIO NO ES VALIDO
        </div>
        `
    }  


    else if(!expresionesR.nombre.exec(nombre.value)){

        
        nombre.focus();
        nombre.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL NOMBRE NO ES VALIDO
        </div>
        `
    }  

    else if(!expresionesR.apellido.exec(apellido.value)){

        
        apellido.focus();
        apellido.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL APELLIDO NO ES VALIDO
        </div>
        `
    }  

    else if(!expresionesR.password.exec(password.value)){

        
        password.focus();
        password.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  LA CONTRSEÑA NO ES VALIDA
        </div>
        `
    }  

    else if(!expresionesR.telefono.exec(telefono.value)){

        
        telefono.focus();
        telefono.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL TELEFONO NO ES VALIDO
        </div>
        `
    }  

    
    else if(usuario.value === ""){
      
        usuario.focus();
        usuario.style.borderColor="red";

        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL USUARIO ESTA VACIO
        </div>
        `
    }
    else if(password.value === ""){
      
        password.focus();       
        password.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  LA CONTRASEÑA ESTA VACIA
        </div>
        `
    }

    //VALIDACION LENGTH

    else if(nombre.value.length>50)
    {
        nombre.focus();       
        nombre.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL NOMBRE ES MUY LARGO
        </div>
        `
    } 



    else if(apellido.value.length>50)
    {
        apellido.focus();       
        apellido.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL APELLIDO ES MUY LARGO
        </div>
        `
    }


    else if(documento.value.length>20)
    {
        documento.focus();       
        documento.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  DOCUMENTO ES MUY LARGO
        </div>
        `
    }


    else if(correo.value.length>50)
    {
        correo.focus();       
        correo.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL CORREO ES MUY LARGO
        </div>
        `
    }


    else if(direccion.value.length>50)
    {
        direccion.focus();       
        direccion.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  LA DIRECCIÓN ES MUY LARGA
        </div>
        `
    }

    else if(direccion.value.length>40)
    {
        direccion.focus();       
        direccion.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL DIRECCION ES MUY LARGO
        </div>
        `
    }


    else if(usuario.value.length>10)
    {
        usuario.focus();       
        usuario.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL USUARIO DEBE TENER 10 CARACTERES COMO MAXIMO
        </div>
        `
    }

    else if(password.value.length>10)
    {
        password.focus();       
        password.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  LA CONTRASEÑA DEBE TENER 10 CARACTERES COMO MAXIMO
        </div>
        `
    }


    else if(telefono.value.length>10)
    {
        telefono.focus();       
        telefono.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL TELEFONO DEBE TENER 15 CARACTERES COMO MAXIMO
        </div>
        `
    }
    //SOLO NUMEROS TELEFONO
    else if(isNaN(telefono.value))
    {
        telefono.focus();       
        telefono.style.borderColor="red";

        
        respuesta.innerHTML = `
        <div class="alert alert-danger role="alert">
            ¡ERROR!  EL TELEFONO INGRESADO NO ES UN NUMERO
        </div>
        `
    }

        // BLACKLIST
    if(respuesta.innerHTML=="")
    {
        if(errroCadena(nombre))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA NOMBRE
          </div>
           `
            return;
        }

        if(errroCadena(apellido))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA APELLIDO
          </div>
           `
            return;
        }

        if(errroCadena(apellido))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA APELLIDO
          </div>
           `
            return;
        }

        if(errroCadena(apellido))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA APELLIDO
          </div>
           `
            return;
        }

        if(errroCadena(documento))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA DOCUMENTO
          </div>
           `
            return;
        }

        if(errroCadena(direccion))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA DIRECCION
          </div>
           `
            return;
        }

        if(errroCadena(telefono))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA TELEFONO
          </div>
           `
            return;
        }

        if(errroCadena(edad))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA EDAD
          </div>
           `
            return;
        }

        if(errroCadena(usuario))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA USUARIO
          </div>
           `
            return;
        }

        if(errroCadena(password))
        {
            respuesta.innerHTML = `
          <div class="alert alert-danger role="alert">
            ¡ERROR!  CADENA PASSWORD
          </div>
           `
            return;
        }

        $("#idBotonpost").click();
    }
}

// FUNCION LISTA NEGRA

function errroCadena(elemento)
{
     var resultado=false;
     //RECORRER LA LISTA NEGRA
    lista.forEach(element=>{
        //VALIDAR CADENA
       if( elemento.value.toString().toUpperCase().search(element)!=-1 )
       {
            resultado=true;
       }
    });

  return resultado;

}