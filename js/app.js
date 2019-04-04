//variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?'); 
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto')

//clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //metodo para restar del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    } 
}

//clase de interface maneja todo lo relacionado del html
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restante = document.querySelector('span#restante');

        //insetal al HTML
        presupuestoSpan.innerHTML = `${cantidad}`
        restante.innerHTML = `${cantidad}`
    }

    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertr en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //quitar el alert despues de 3 segundos
        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
            //limpiar formulario
            formulario.reset();
      }, 3000);
    }

    agregarGastoListado(nombreGasto, cantidad) {
        const gastosListado = document.querySelector('#gastos ul'); 

        //crear li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${nombreGasto}
            <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
        `;
        gastosListado.appendChild(li);
    }

    //comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        //leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        //imprimir en el HTML
        restante.innerHTML = `
            ${presupuestoRestanteUsuario}
        `;
        this.comprbarPresupuesto();
    }
    //cambia de color el presupuesto restante
    comprbarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar el 25% del gasto
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger')
        } else if((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning')
        }
    
    }
}


//Event listener
document.addEventListener('DOMContentLoaded', function() {
    if(presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
            cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
            //instancear clase interface
            const ui = new Interfaz();
            ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);

    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //ler del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    //instancear la interface
    const ui = new Interfaz();
    if(nombreGasto === null || nombreGasto === '') {
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        //inserta en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
})