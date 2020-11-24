import axios from 'axios';
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';

const requisitos = document.querySelector('.listado-pendientes');

if (requisitos) {
    requisitos.addEventListener('click', e =>{
         //console.log(e.target.classList);
         if(e.target.classList.contains('fa-check-circle')){
             //console.log('actualizando');
             const icono = e.target;
             const idRequisito = icono.parentElement.parentElement.dataset.requisito;
             const url = `${location.origin}/requisitos/${idRequisito}`;
            console.log(url);
            axios.patch(url, { idRequisito })
            .then(function(respuesta){
            //console.log(respuesta);
               if(respuesta.status===200){
                   icono.classList.toggle('completo');
                   actualizarAvance();
               }
            })
         }
        if(e.target.classList.contains('fa-trash')){
            //console.log('Eliminando...');
            const tareaHTML = e.target.parentElement.parentElement,
            idRequisito = tareaHTML.dataset.requisito;
            //console.log(tareaHTML);
            //console.log(idRequisito);
            Swal.fire({
                title: 'Estas seguro Eliminar el requisito?',
                text: "Si se elimina, pierde el requisito!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrarlo!',
                cancelButtonText: 'Cancelar!'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/requisitos/${idRequisito}`;
                    axios.delete(url, {params:{idRequisito}})
                    .then(function(respuesta){
                        //console.log(respuesta);
                        if(respuesta.status===200){
                            tareaHTML.parentElement.removeChild(tareaHTML);

                            //opcional
                            Swal.fire(
                                'Requisito eliminado',
                                respuesta.data,
                                'success'
                            )
                            actualizarAvance();
                        }
                    })
                }
            })
        }

    });
}

export default requisitos;