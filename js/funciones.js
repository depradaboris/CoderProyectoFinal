const botonesCompra = document.getElementsByName('compra');

const portafolio = [];


function compraAccion(id) {
    // Obtener el elemento por su ID
    let elemento = document.getElementById(id);
    let precio;
    // Verificar si se encontró el elemento
    if (elemento) {
        // Obtener el valor del elemento
        precio = elemento.value;
    }

    const accion = {
        "nombre":id,
        "precio":precio,
    }

    portafolio.push(accion);
    
    // Guardar el objeto en localStorage
    localStorage.setItem('portafolio', JSON.stringify(portafolio));
    Swal.fire({
        title: 'Compra realizada',
        text: `La compra de la acción fue creada correctamente ${id} en nuestro portafolior`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}



function venderAccion(accionAVender) {
    // Obtener el objeto desde localStorage
    let accionesGuardadas = localStorage.getItem('portafolio');

    // Verificar si hay datos almacenados
    if (accionesGuardadas) {
        // Convertir la cadena JSON a un objeto
        let accionesObjetoRecuperado = JSON.parse(accionesGuardadas);

        // Buscar la acción en el array
        const indiceAccion = accionesObjetoRecuperado.findIndex(accion => accion.nombre === accionAVender);

        if (indiceAccion !== -1) {
            // La acción existe, puedes actualizarla o eliminarla según tu necesidad
            accionesObjetoRecuperado.splice(indiceAccion, 1);

            // Vuelve a guardar el objeto actualizado en localStorage
            localStorage.setItem('portafolio', JSON.stringify(accionesObjetoRecuperado));
        
            Swal.fire({
                title: 'Venta Realizada',
                text: `Se ha vendido correctamente`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: `No se ha encontrado la acción ${accionAVender}en nuestro portafolior`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } else {
        Swal.fire({
            title: 'Error',
            text: `No se han encontrado datos`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

function consultarSaldo(){

}