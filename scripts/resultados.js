//array imagenes
const animalImages = {
  tiburon: "./public/animalitos/ruletaroyal_0.png",
  carnero: "./public/animalitos/ruletaroyal_01.png",
  toro: "./public/animalitos/ruletaroyal_02.png",
  ciempies: './public/animalitos/ruletaroyal_03.png',
  alacran: "./public/animalitos/ruletaroyal_04.png",
  leon: "./public/animalitos/ruletaroyal_05.png",
  rana: './public/animalitos/ruletaroyal_06.png',
  perico: './public/animalitos/ruletaroyal_07.png',
  raton: "./public/animalitos/ruletaroyal_08.png",
  aguila: "./public/animalitos/ruletaroyal_09.png",
  tigre: "./public/animalitos/ruletaroyal_10.png",
  gato: "./public/animalitos/ruletaroyal_11.png",
  caballo: "./public/animalitos/ruletaroyal_12.png",
  mono: "./public/animalitos/ruletaroyal_13.png",
  paloma: "./public/animalitos/ruletaroyal_14.png",
  zorro: "./public/animalitos/ruletaroyal_15.png",
  oso: "./public/animalitos/ruletaroyal_16.png",
  pavo: "./public/animalitos/ruletaroyal_17.png",
  burro: "./public/animalitos/ruletaroyal_18.png",
  chivo: "./public/animalitos/ruletaroyal_19.png",
  cochino: "./public/animalitos/ruletaroyal_20.png",
  gallo: "./public/animalitos/ruletaroyal_21.png",
  camello: './public/animalitos/ruletaroyal_22.png',
  cebra: "./public/animalitos/ruletaroyal_23.png",
  iguana: './public/animalitos/ruletaroyal_24.png',
  gallina: "./public/animalitos/ruletaroyal_25.png",
  vaca: "./public/animalitos/ruletaroyal_26.png",
  perro: "./public/animalitos/ruletaroyal_27.png", 
  zamuro: "./public/animalitos/ruletaroyal_28.png",
  elefante: "./public/animalitos/ruletaroyal_29.png",
  caiman: "./public/animalitos/ruletaroyal_30.png",
  lapa: './public/animalitos/ruletaroyal_31.png',
  ardilla: "./public/animalitos/ruletaroyal_32.png",
  pescado: "./public/animalitos/ruletaroyal_33.png",
  venado: "./public/animalitos/ruletaroyal_34.png",
  pantera: "./public/animalitos/ruletaroyal_35.png",
  culebra: "./public/animalitos/ruletaroyal_36.png",
};

// Array de horarios
const horarios = [
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "10:00 PM",
  "10:30 PM",
];

function obtenerImagenAnimal(nombreAnimal) {
  // Verifica si el nombre del animal existe en el objeto animalImages
  if (nombreAnimal.toLowerCase() in animalImages) {
    return animalImages[nombreAnimal.toLowerCase()];
  } else {
    return "imagen_no_encontrada.jpg";
  }
}

function obtenerDatosDeLoteria() {

  function generarNuevoLink() {
    
    function obtenerFechaEnVenezuela() {
      const opcionesFechaHora = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Caracas' // Zona horaria de Caracas, Venezuela
      };
      const fechaEnVenezuela = new Date().toLocaleString('es-VE', opcionesFechaHora);
      return fechaEnVenezuela;
    }
    
    // Ejemplo de fecha en formato original (DD/MM/YYYY)
    const fechaConFormatoOriginal = obtenerFechaEnVenezuela();
    
    function convertirFormatoFecha(fechaConFormatoOriginal) {
      // Divide la fecha en día, mes y año
      const partesFecha = fechaConFormatoOriginal.split('/');
      
      // Las partes de la fecha estarán en el orden día, mes, año (DD/MM/YYYY)
      const dia = partesFecha[0];
      const mes = partesFecha[1];
      const anio = partesFecha[2];
    
      // Formatea la fecha en el nuevo formato (YYYY-MM-DD)
      const fechaFormateada = `${anio}-${mes}-${dia}`;
      
      return fechaFormateada;
    }
  
    // Convierte la fecha al formato deseado (YYYY-MM-DD)
    const fechaFormateada = convertirFormatoFecha(fechaConFormatoOriginal);
    console.log('Fecha formateada:', fechaFormateada);

    const urlBase = "https://artesting.apuestasroyal.com/apiRoyal/resultados/";

    // Construir el nuevo enlace con la fecha actual
    const nuevoLink = urlBase + fechaFormateada;
    console.log("nuevo link: ", nuevoLink);

    return nuevoLink;
  }

  const url = generarNuevoLink();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos de la API:", data);
      if (data.error === 1) {
        // Mostrar el mensaje de error en un elemento HTML (por ejemplo, un h1)
        const mensajeError = document.createElement("h1");
        mensajeError.textContent = data.message;
        // Agregar el mensaje de error al contenedor deseado en tu página
        const contenedorError = document.getElementById("resultados-container");
        contenedorError.appendChild(mensajeError);
      } 

      //  elemento resultadosContainer
      const resultadosContainer = document.getElementById(
        "resultados-container"
      );
      
      
      if (resultadosContainer) {
        // Crear  card del proximo sorteo
        console.log("Card proximo sorteo");
        //toma el ultimo sorteo hecho del momento
        let horarioDeseado = data[0].hora;
       
        let nuevoHorario;
        //verificar que no haya terminado el dia
        
        if (horarioDeseado !== "10:30 PM") {
          // Divide el horario en horas y minutos
          let partesHorario = horarioDeseado.split(" ");
          console.log(partesHorario)
          let horaMinutos = partesHorario[0].split(":");
          let amPm = partesHorario[1];

          // Convierte las partes en números enteros
          let horas = parseInt(horaMinutos[0]);
          let minutos = parseInt(horaMinutos[1]);
         
          // Suma 1 a la hora
          let nuevaHora = horas + 1;
          if (amPm === "PM" && nuevaHora < 12) {
            nuevaHora += 12;
          }

          // Formatea la nueva hora y minutos
          if (nuevaHora >= 12) {
            amPm = "PM";
          } else {
            amPm = "AM";
          }

          if (nuevaHora > 12) {
            nuevaHora -= 12;
          }

          nuevoHorario = nuevaHora+":"+minutos+amPm;
         
          console.log("Horario original:"+ horarioDeseado);
          console.log("Nuevo horario:"+ nuevoHorario);
        
        
          const cardAdicional = document.createElement("div");
          cardAdicional.className = 'class="col-sm-12 col-md-6 col-lg-4 mb-4';
          cardAdicional.innerHTML = `
     <div>
       <div class="card text-dark card-has-bg click-col mb-4" style="
           background-image: url('./public/background-card.png')">
           <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
           <div class="card-body text-center">
               <small class="card-meta mb-2"><i class="far fa-clock dark-icon"></i>${nuevoHorario}</small>
               <h4 class="card-title mt-5">
                   <a class="text-dark no-decoration" href="">PROXIMO SORTEO</a>
               </h4>
               <small class="text-dark"></small>
               <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
           </div>
           <div class="card-footer">
               <div class="media">
                   <img class="mr-3 rounded-circle"
                       src="./public/logo1.png?format=auto&version=1688931977&width=80&height=80"
                       alt="Generic placeholder image" style="max-width: 50px" />
                   <div class="media-body">
                       <h6 class="my-0 text-dark d-block">Ruleta Royal</h6>
                       <small class="text-dark">${data[0].fecha}</small>
                   </div>
               </div>
           </div>
       </div>
       </div>
     </div>
   `;
  
          // Agregar la nueva card al contenedor de resultados
          resultadosContainer.appendChild(cardAdicional);
  
        }

        
        data.forEach((item) => {
          console.log("Lotería:", item.loteria);
          console.log("Número:", item.numero);
          console.log("Nombre:", item.nombre);
          console.log("Hora:", item.hora);
          console.log("Fecha:", item.fecha);
          let imagen = obtenerImagenAnimal(item.nombre)
          console.log(obtenerImagenAnimal(item.nombre))
          console.log("-------------------");
          //const imagenAnimal = obtenerImagenAnimal(item.nombre);
          // Crea elementos
          const card = document.createElement("div");
          card.className = 'class="col-sm-12 col-md-6 col-lg-4 mb-4';
          card.innerHTML = `
                    <div>
                    <div class="card text-dark card-has-bg click-col mb-4" style="
                        background-image: url('./public/background-card.png')">
                        <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                            <div class="card-body text-center">
                            <h4 class="card-meta mb-2"><i class="far fa-clock dark-icon"></i>${item.hora}</h4>
                                <h4 class="card-title mt-0">
                                    
                                </h4>
                                
                                
                                <img class="mr-3 rounded-circle"
                                        src="${imagen}"
                                        alt="Animal" style="max-width: 200px" />
                            </div>
                            <div class="card-footer">
                                <div class="media">
                                    <img class="mr-3 rounded-circle"
                                        src="./public/logo1.png?format=auto&version=1688931977&width=80&height=80"
                                        alt="Generic placeholder image" style="max-width: 50px" />
                                    <div class="media-body">
                                        <h6 class="my-0 text-dark d-block">Ruleta Royal</h6>
                                        <small class="text-dark">${item.fecha}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                    `;
                    resultadosContainer.appendChild(card);
        });
      } else {
        console.error(
          'El elemento con ID "resultados-container" no existe en el HTML.'
        );
      }
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API:", error);
      
    });
}

//
document.addEventListener("DOMContentLoaded", obtenerDatosDeLoteria);
