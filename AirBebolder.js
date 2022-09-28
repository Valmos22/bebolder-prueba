import { ciudades, vuelos } from './datos.js';

const todoVuelos = document.getElementById("vuelos");

const radioButtonVueloRt = document.getElementById('RT');
const radioButtonVueloOw = document.getElementById('OW');

const fechaIda = document.getElementById('fecha-ida');
const fechaRegreso = document.getElementById('fecha-regreso');

const ciudadOrigen = document.getElementById('ciudad-origen');
const ciudadDestino = document.getElementById('ciudad-destino');

const abrirModal = document.getElementById('boton-modal-pasajeros');
const modalPasajeros = document.querySelector('.modal-pasajeros');

const formaPagos = document.getElementById('forma-pagos')

const guardarDatosPasajeros = document.getElementById("guardar")
const guardarDatosPago = document.getElementById('finalizar')
const buscarVuelos = document.getElementById('buscar-vuelos');
const detallesVuelosIda = document.getElementById('detalles-vuelo-ida');
const detallesVuelosRegreso = document.getElementById('detalles-vuelo-regreso');

let ciudadesDestino = [];
let candidadAdultos = 1,
  candidadNinos = 0,
  candidadInfantes = 0,
  totalPasajeros = 1;

const datosVuelo = [];
const datosPasajero = {
  nombre: "",
  apellido: "",
  documento: "",
  correo: "",
  edad: "",
  telefono: ""
}
let RT = true;


radioButtonVueloRt.addEventListener("click", () => {
  fechaRegreso.style.display = 'block';
  RT = true;
});
radioButtonVueloOw.addEventListener("click", () => {
  fechaRegreso.style.display = 'none';
  RT = false;
});
abrirModal.addEventListener('click', () => {
  let clases = modalPasajeros.getAttribute('class');
  clases.includes('es-visible') ? modalPasajeros.classList.remove('es-visible') : modalPasajeros.className += ' es-visible';

});

const listarCiudades = () => {
  ciudades.map(ciudad => {
    ciudadOrigen.innerHTML += `
    <option value="${ciudad.nombre}" id="${ciudad.id}">${ciudad.nombre}</option>
    `;
  });

  ciudadOrigen.addEventListener('click', () => {

    const existeLocalStorage = localStorage.getItem("Ciudades");
    if (existeLocalStorage) {
      localStorage.removeItem(existeLocalStorage);
    }

    const seleccion = ciudades.filter(ciudadSeleccionada => ciudadSeleccionada.nombre === ciudadOrigen.value);

    seleccion.map(select => {
      select.destinos.map(todo => {
        ciudadDestino.innerHTML += `
          <option value="${todo.nombre}" id="${todo.nombre}">${todo.nombre}</option>
        `;
      });
    });
  });
};
listarCiudades();

function sumarRestarPasajeros() {

  //
  const sumaAdulto = document.getElementById('mas-adulto');
  const restaAdulto = document.getElementById('menos-adulto');
  sumaAdulto.addEventListener("click", () => {
    const cantidad = document.getElementById('cantidad-adultos');
    candidadAdultos += 1;
    cantidad.innerHTML = candidadAdultos;

    
    totalPasajeros = candidadAdultos + candidadNinos + candidadInfantes;
    abrirModal.innerHTML = `${totalPasajeros} pasajeros`
  });
  restaAdulto.addEventListener("click", () => {
    const restaAdulto = document.getElementById('cantidad-adultos');
    candidadAdultos -= 1;
    restaAdulto.innerHTML = candidadAdultos;

    if (candidadAdultos <= 0) {
      restaAdulto.innerHTML = candidadAdultos = 0;
    }

    totalPasajeros = candidadAdultos + candidadNinos + candidadInfantes;
    abrirModal.innerHTML = `${totalPasajeros} pasajeros`

  });

  //
  const sumaNinos = document.getElementById('mas-nino');
  const restaNinos = document.getElementById('menos-nino');
  sumaNinos.addEventListener("click", () => {
    const cantidad = document.getElementById('cantidad-ninos');
    candidadNinos += 1;
    cantidad.innerHTML = candidadNinos;

    totalPasajeros = candidadAdultos + candidadNinos + candidadInfantes;
    abrirModal.innerHTML = `${totalPasajeros} pasajeros`

  });
  restaNinos.addEventListener("click", () => {
    const cantidad = document.getElementById('cantidad-ninos');
    candidadNinos -= 1;
    cantidad.innerHTML = candidadNinos;

    if (candidadNinos <= 0) {
      cantidad.innerHTML = candidadNinos = 0;
    }

    totalPasajeros = candidadAdultos + candidadNinos + candidadInfantes;
    abrirModal.innerHTML = `${totalPasajeros} pasajeros`
  });

  //
  const sumaInfantes = document.getElementById('mas-infante');
  const restaInfantes = document.getElementById('menos-infante');
  sumaInfantes.addEventListener("click", () => {
    const cantidad = document.getElementById('cantidad-infante');
    candidadInfantes += 1;
    cantidad.innerHTML = candidadInfantes;

    totalPasajeros = candidadAdultos + candidadNinos + candidadInfantes;
    abrirModal.innerHTML = `${totalPasajeros} pasajeros`
  });
  restaInfantes.addEventListener("click", () => {
    const cantidad = document.getElementById('cantidad-infante');
    candidadInfantes -= 1;
    cantidad.innerHTML = candidadInfantes;

    if (candidadInfantes <= 0) {
      cantidad.innerHTML = candidadInfantes = 0;
    }

    totalPasajeros = candidadAdultos + candidadNinos + candidadInfantes;
    abrirModal.innerHTML = `${totalPasajeros} pasajeros`
  });

}
sumarRestarPasajeros();


const mostrarVuelosDeIda = (origen, destino, fecha) => {
  let vuelosCiudad = vuelos.filter(vuelo => vuelo.origen === origen && vuelo.destino === destino && vuelo.fecha === fecha);

  vuelosCiudad.map(deta => {
    detallesVuelosIda.innerHTML += `

      <div class="vuelo-disponible" id="${deta.id}">
      <input type="button" class="rec" value="seleccionar" data-id="${deta.id}">

        <div class="detalles">
            <p>Hora salida <br>
              ${deta.horaSalida}
            </p>
            <p>Duracion <br>
              1h
            </p>
            <p>Hora llegada <br>
              ${deta.horaLlegada}
            </p>
            <p>Valor <br>
              ${deta.valor}
            </p>
        </div>
        <hr>
        <p class="p-tipo">${deta.tipo}</p>
      </div>
    `;
  });

};

const mostrarVuelosDeRegreso = (origen, destino, fecha) => {
  let vuelosCiudad = vuelos.filter(vuelo => vuelo.origen === destino && vuelo.destino === origen && vuelo.fecha === fecha);

  vuelosCiudad.map(deta => {
    detallesVuelosRegreso.innerHTML += `

      <div class="vuelo-disponible" id="${deta.id}">
        <input type="button" class="rec" value="seleccionar" data-id="${deta.id}">

        <div class="detalles">
            <p>Hora salida <br>
              ${deta.horaSalida}
            </p>
            <p>Duracion <br>
              1h
            </p>
            <p>Hora llegada <br>
              ${deta.horaLlegada}
            </p>
            <p>Valor <br>
              ${deta.valor}
            </p>
        </div>
        <hr>
        <p class="p-tipo">${deta.tipo}</p>
      </div>
    `;
  });
};
buscarVuelos.addEventListener('click', () => {

  localStorage.removeItem("DatosAdultos");
  localStorage.removeItem("DatosNinos");
  localStorage.removeItem("DatosInfantes");
  localStorage.removeItem("DatosPago");
  localStorage.removeItem("VueloIda");


  // mostrarVuelosDeIda(ciudadOrigen.value, ciudadDestino.value, fechaIda.value)
  // mostrarVuelosDeRegreso(ciudadOrigen.value, ciudadDestino.value, fechaRegreso.value)
  if (RT == false) {
    document.getElementById('vuelos-ida').style.display = 'block';
    mostrarVuelosDeIda(ciudadOrigen.value, ciudadDestino.value, fechaIda.value);
  }
  if (RT == true) {
    document.getElementById('vuelos-ida').style.display = 'block';
    document.getElementById('vuelos-regreso').style.display = 'block';
    mostrarVuelosDeIda(ciudadOrigen.value, ciudadDestino.value, fechaIda.value);
    mostrarVuelosDeRegreso(ciudadOrigen.value, ciudadDestino.value, fechaRegreso.value);
  }

  document.getElementById("boton").style.display = "flex";

  todoVuelos.addEventListener("click", (e) => {
    verDetalles(e);
  });

});


const verDetalles = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("rec")) {
    let codigoId = e.target.parentElement.querySelector(".rec").dataset.id;
    const vuel = document.getElementById(`${codigoId}`);
    // vuel.style.backgroundColor = "#8b66ceb3"
    const vuelosEscogidos = [];

    let esteVuelo = vuelos.filter(vu => vu.id === codigoId);
    localStorage.setItem("VueloIda", JSON.stringify(esteVuelo));

    const existeLocalStorage = localStorage.getItem("VueloIda");
    if (existeLocalStorage) {
      localStorage.removeItem(existeLocalStorage);
      localStorage.setItem("VueloIda", JSON.stringify(esteVuelo));
    }
    
    let idVu = JSON.parse(localStorage.getItem("VueloIda"));
    idVu.map(item => {
      if(vuel.getAttribute('id') === item.id){
        console.log(item.id)
        document.getElementById(`${item.id}`).style.backgroundColor = 'red'
      }else{
        console.log('es-----')
        document.getElementById(`${item.id}`).style.background = 'none'
      }
    })
    

  }
  e.stopPropagation();
};

document.getElementById("continuar").addEventListener("click", ()=>{
  diligenciarDatosPasajero(candidadAdultos, candidadNinos, candidadInfantes);

  todoVuelos.style.display = "none"
  document.getElementById("datos-pasajeros").style.display = "flex"

});

const diligenciarDatosPasajero =(adulto, nino, infante)=>{

  const pasajeroAdulto = document.getElementById("pasajero-adulto");
  const pasajeroNino = document.getElementById("pasajero-nino");
  const pasajeroInfante = document.getElementById("pasajero-infante");

  if(adulto > 0){
    for (let index = 0; index < adulto; index++) {
      pasajeroAdulto.innerHTML += `
        <hr>
        <p class="p-pasajero">Adulto ${index+1}</p>
        <form class="formulario-adulto">
            <div>
                <input class="d-a" type="text" name="nombre" value="" placeholder="Nombres">
                <input class="d-a" type="text" name="apellidos" value="" placeholder="Apellidos">
            </div>

            <div>
                <input class="d-a" type="text" name="documento" value="" placeholder="N° Documento">
                <input class="d-a" type="text" name="edad" value="" placeholder="Edad">
            </div>

            <div>
                <input class="d-a" type="text" name="telefono" value="" placeholder="N° Telefono">
                <input class="d-a" type="text" name="correo" value="" placeholder="Correo">
            </div>  
        </form>
      ` 
    }
  }

  if(nino > 0){
    for (let index = 0; index < nino; index++) {
      pasajeroNino.innerHTML += `
        <hr>
        <p class="p-pasajero">Niño ${index+1}</p>
        <form class="formulario-nino">
            <div>
                <input class="d-n" type="text" name="nombre" value="" placeholder="Nombres">
                <input class="d-n" type="text" name="apellidos" value="" placeholder="Apellidos">
            </div>

            <div>
                <input class="d-n" type="text" name="documento" value="" placeholder="N° Documento">
                <input class="d-n" type="text" name="edad" value="" placeholder="Edad">
            </div>

            <div>
                <input class="d-n" type="text" name="telefono" value="" placeholder="N° Telefono">
                <input class="d-n" type="text" name="correo" value="" placeholder="Correo">
            </div>  
        </form>
      ` 
    }
  }

  if(infante > 0){
    for (let index = 0; index < infante; index++) {
      pasajeroInfante.innerHTML += `
        <hr>
        <p class="p-pasajero">Infante ${index+1}</p>
        <form class="formulario-infante">
            <div>
                <input class="d-i" type="text" name="nombre" value="" placeholder="Nombres">
                <input class="d-i" type="text" name="apellidos" value="" placeholder="Apellidos">
            </div>

            <div>
                <input class="d-i" type="text" name="documento" value="" placeholder="N° Documento">
                <input class="d-i" type="text" name="edad" value="" placeholder="Edad">
            </div>

            <div>
                <input class="d-i" type="text" name="telefono" value="" placeholder="N° Telefono">
                <input class="d-i" type="text" name="correo" value="" placeholder="Correo">
            </div>  
        </form>
      ` 
    }
  }
};

guardarDatosPasajeros.addEventListener("click", ()=>{
  const formAdulto = document.querySelectorAll(".d-a")
  let dataAdulto = []
  for (const iterator of formAdulto) {
    dataAdulto.push(iterator.value)
  }
  localStorage.setItem("DatosAdultos", JSON.stringify(dataAdulto));


  const formNino = document.querySelectorAll(".d-n")
  let dataNino = []
  for (const iterator of formNino) {
    dataNino.push(iterator.value)
  }
  localStorage.setItem("DatosNinos", JSON.stringify(dataNino));


  const formInfante = document.querySelectorAll(".d-i")
  let dataInfante = []
  for (const iterator of formInfante) {
    dataInfante.push(iterator.value)
  }
  localStorage.setItem("DatosInfantes", JSON.stringify(dataInfante));

  formaPagos.style.display = 'flex'
  document.getElementById("datos-pasajeros").style.display = "none"
})

guardarDatosPago.addEventListener('click', ()=>{

  const nombrePago = document.getElementById('pago-nombre')
  const documentoPago = document.getElementById('pago-documento')
  const emailPago = document.getElementById('pago-email')
  const tarjetaPago = document.getElementById('pago-tarjeta')

  const datosPago = {
    nombre: '',
    documento: '',
    email: '',
    numTarjeta: ''
  }

  datosPago.nombre = nombrePago.value;
  datosPago.documento = documentoPago.value;
  datosPago.email = emailPago.value;
  datosPago.numTarjeta = tarjetaPago.value;

  localStorage.setItem("DatosPago", JSON.stringify(datosPago));

})


