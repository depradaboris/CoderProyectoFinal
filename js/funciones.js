const botonesCompra = document.getElementsByName('compra');

const portafolio = [];

let btnAbrirModal = document.getElementById("btnAbrirModal");
let modal = document.getElementById("miModal");


function abrirModal() {
  modal.style.display = "block";
}
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
        // Si no se encuentra el elemento, mostrar un mensaje de error
        console.error(`No se encontró el elemento con ID: ${id}`);
    }
}



function venderAccion(accionAVender) {
    // Obtener el objeto desde localStorage
    let portActual = JSON.parse(localStorage.getItem('portafolio')) || [];
    console.log(accionAVender);
    let elementoVender = document.getElementById(accionAVender);
    
    const accionEncontrada = portActual.find(accionBusca => accionBusca.nombre === accionAVender);
    console.log(accionEncontrada);
    
}

let cruz = document.getElementById("cerrar");
console.log(cruz);

cruz.addEventListener("click", cerrarModal);

function cerrarModal() {
    modal.style.display = "none";
}