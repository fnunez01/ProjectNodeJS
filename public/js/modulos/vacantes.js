import Swal from 'sweetalert2';

import axios from 'axios';

const btnEliminar = document.querySelector('.btn.btn-danger');

if (btnEliminar) {

  btnEliminar.addEventListener('click', e=>{
    const urlVacante = e.target.dataset.vacantesUrl;
    Swal.fire({
        title: 'Estás seguro de eliminar la vacante?',
        text: "Si se elimina, pierde la vacante!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borralo!',
        cancelButtonText: 'Cancelar!'
      }).then((result) => {
        const url = `${location.origin}/vacantes/${urlVacante}`;
        //console.log(url);
        axios.delete(url, {params: {urlVacante}})
        .then(function(respuesta){
          if (result.isConfirmed) {
            Swal.fire(
              'Vacante borrada!',
              response.data,
              'success'
            )
          }
          setTimeout(()=>{
              window.location.href='/'
          }, 1000);
        })
  
      })
        
})
}
export default btnEliminar;
/*
if(btnEliminar){
    btnEliminar.addEventListener('click', e=> {
  
      const urlVacante = e.target.dataset.vacanteUrl;
      console.log(urlVacante);
      Swal.fire({
        title: 'Estás seguro de eliminar la vacante?',
        text: "Si se elimina, pierde la vacante!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borralo!',
        cancelButtonText: 'Cancelar!'
      }).then((result) => {
        const url = `${location.origin}/vacantes/${urlVacante}`;
        console.log(url);
        axios.delete(url, {params: {urlVacante}})
          .then(function(respuesta){
            console.log(respuesta);
            if (result.isConfirmed) {
              Swal.fire(
                'Vacante borrado!',
                response.data,
                'success'
              )
            }
            setTimeout(()=>{
              window.location.href='/'
            }, 2000);
          })
            
          
        
        
      })
   
    });
  }
  */
