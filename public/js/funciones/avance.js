import Swal from 'sweetalert2';
export const actualizarAvance = ()=>{
    //Selecionar Tareas
    const requisitos = document.querySelectorAll('li.requisito');
    //Seleccionar las tareas completadas
    const requisitosCompletados = document.querySelectorAll('i.completo');
    //calcular el avance
    const avance = Math.round((requisitosCompletados.length/requisitos.length)*100);

    const porcentaje = document.querySelector('#porcentaje');
    //console.log(porcentaje);

    porcentaje.style.width = avance+'%';

    if(avance==100){
        Swal.fire(
            'Requisitos Completados',
            'Felicidades has completado los requisitos',
            'success'
        )
    }
}