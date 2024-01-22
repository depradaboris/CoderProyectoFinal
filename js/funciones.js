const botonesCompra = document.getElementsByName('compra');

const portafolio = [];

let btnAbrirModal = document.getElementById("btnAbrirModal");
let modal = document.getElementById("miModal");


function abrirModal() {
    modal.style.display = "block";

    return new Promise((resolve) => {
        document.getElementById('formularioCant').addEventListener('submit', function(event) {
            event.preventDefault();
            const cantidad = parseInt(document.getElementById('cantAccion').value);
            resolve(cantidad); // Resuelve la promesa con el valor de cantidad
        });
    });
}


function cerrarModal() {
    modal.style.display = "none";
}

async function compraAccion(id) {
    // Obtener el elemento por su ID
    let elemento = document.getElementById(id);

    // Verificar si se encontró el elemento
    if (elemento) {
        const cantidad = await abrirModal(); // Espera a que abrirModal() termine y obtenga la cantidad
            
        // El resto del código de compra
        let precioAccion = parseInt(elemento.value);
        let saldoActual = parseInt(localStorage.getItem('saldo'));

        if (saldoActual >= precioAccion * cantidad) {
            saldoActual -= precioAccion * cantidad;
            localStorage.setItem('saldo', saldoActual);

            // Obtener el array actual de localStorage
            let portActual = JSON.parse(localStorage.getItem('portafolio')) || [];

            // Buscar la acción por nombre
            const accionEncontrada = portActual.find(accionBusca => accionBusca.nombre === id);

            if (accionEncontrada !== undefined) {
                // Si la acción ya existe, actualizar la cantidad
                accionEncontrada.cantidad += cantidad;
            } else {
                // Si la acción no existe, agregarla al array
                const nuevaAccion = {
                    nombre: id,
                    cantidad: cantidad
                };
                portActual.push(nuevaAccion);
            }

            // Guardar el array actualizado en localStorage
            localStorage.setItem('portafolio', JSON.stringify(portActual));

            Swal.fire({
                title: 'Compra realizada',
                text: `La compra de la acción ${id} fue creada correctamente en nuestro portafolio`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Cerrar el modal después de procesar la compra
            cerrarModal();
        } else {
            Swal.fire({
                title: 'Error',
                text: `No se ha podido realizar la compra ya que no tiene suficientes fondos`,
                icon: 'error',
                confirmButtonText: 'OK'
            });

            // Cerrar el modal en caso de error
            cerrarModal();
        }
    } else {
        Swal.fire({
            title: 'Error',
            text: `No se ha podido realizar la compra ya que no tiene suficientes fondos`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function venderAccion(accionVenta) {
    // Obtener el objeto desde localStorage
    let portActual = JSON.parse(localStorage.getItem('portafolio')) || [];
    let saldoActual = parseInt(localStorage.getItem('saldo'));
    
    const elementosConMismoId = document.querySelectorAll(`#${accionVenta}`)[1];

        let abuscar = elementosConMismoId.id;
        
        const cantidad = await abrirModal();
        const accionEncontrada = portActual.find(accionBusca => accionBusca.nombre === abuscar);
        if (accionEncontrada !== undefined) {
            cerrarModal();
            // Si la acción ya existe, actualizar la cantidad
            if (accionEncontrada.cantidad >= cantidad) {
                accionEncontrada.cantidad -= cantidad;
                saldoActual += parseInt(elementosConMismoId.value) * cantidad;
                if (accionEncontrada.cantidad <= 0) {
                    // Si la cantidad es 0 o menor, eliminar el elemento del array
                    portActual = portActual.filter(accion => accion.nombre !== accionEncontrada.nombre);
                }
                localStorage.setItem('saldo', saldoActual);
               
                // Guardar el array actualizado en localStorage
                localStorage.setItem('portafolio', JSON.stringify(portActual));
                
                Swal.fire({
                    title: 'Venta realizada',
                    text: `La venta de la acción fue creada correctamente en nuestro portafolio`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                
            }else{
                Swal.fire({
                    title: 'La cantidad que desea vender supera el limite de acciones',
                    text: `La venta de la acción no pudo realizarse `,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }else{
            Swal.fire({
                title: 'Error en la venta',
                text: `La venta de la acción no pudo realizarse `,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    
    cerrarModal();
}

function abrirModalVender() {
    modal.style.display = "block";

    return new Promise((resolve) => {
        const formulario = document.getElementById('formularioCantVender');
        const inputCantidad = document.getElementById('cantAccionVender');

        const enviarHandler = function (event) {
            event.preventDefault(); // Evitar que el formulario afecte la URL
            const cantidad = parseInt(inputCantidad.value);
            resolve(cantidad); // Resuelve la promesa con el valor de cantidad
        };

        formulario.addEventListener('submit', enviarHandler);

        document.getElementById('botonEnviar').addEventListener('click', function () {
            formulario.removeEventListener('submit', enviarHandler); // Eliminar el manejador de eventos
            formulario.submit(); // Enviar el formulario manualmente después de resolver la promesa
        });
    });
}



let cruz = document.getElementById("cerrar");

cruz.addEventListener("click", cerrarModal);

function cerrarModal() {
    modal.style.display = "none";
}