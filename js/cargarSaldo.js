document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario por su ID
    let formulario = document.getElementById('carga');
    // Agregar un event listener para el evento 'submit'
    formulario.addEventListener('submit', function(event) {
        // Prevenir el comportamiento por defecto del formulario (enviar a una página diferente)
        event.preventDefault();

        // Obtener los valores del formulario

        let saldo = document.getElementById('cantidad').value;
        let num_tarjeta = document.getElementById('num_tarjeta').value;
        let fecha_vencimiento = document.getElementById('fecha_vencimiento').value;
        let cod_seguridad = document.getElementById('cod_seguridad').value;
        let dni = document.getElementById('dni').value;
        /* let correo = document.getElementById('correo').value; */
        if(saldo === '' && num_tarjeta ==='' && fecha_vencimiento === '' && cod_seguridad ==='' && dni === ''){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, todos los campos del formulario.'
              });
        }else{
            guardarSaldo(saldo);
        }
        
    });
});

function guardarSaldo(saldo){
    try {
        // Convertir el string a un número entero
        let saldoAingresar = parseInt(saldo);
    
        if (isNaN(saldoAingresar)) {
          throw new Error('El saldo no es un número válido.');
        }
    
        let saldoActual = parseInt(localStorage.getItem('saldo')) || 0;
    
        // Sumar la cantidad al saldo actual
        let nuevoSaldo = saldoActual + saldoAingresar;
        // Guardar el nuevo saldo en el localStorage
        localStorage.setItem('saldo', nuevoSaldo);

        const valorGuardado = localStorage.getItem('saldo');

        if(parseInt(valorGuardado) === nuevoSaldo){
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: `Se ha ingresado nuevos fondos, su saldo actual es de $ARG ${nuevoSaldo}`
          });
        }
        return true;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ha ocurrido un error a cargar el saldo`
        });
        return false; // Devolver false si hay algún error
      }

}
