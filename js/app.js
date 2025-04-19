let pagina=1;

//Crear un objeto para validar la cita 
const cita ={   
	nombre: '',
	fecha:'',
	dia:'',
  hora: '',
	servicios:[]
}
document.addEventListener('DOMContentLoaded', function(){
 Llamar_Mostar_Servicios();
});

function Llamar_Mostar_Servicios(){
 Mostrar_Servicios();

 //Resaltar el Div actual segun el tab que se presione
 mostrarSeccion();

 //Oculta o muestra una seccion segun el tab que se presione
 cambiarSeccion();

 //Paginacion Siguiente y Anterior
 paginaSiguiente();

 paginaAnterior();

 //Comprueba la pagina actual para ocultar o mostras la paginacion
 botonesPaginador();

 //Muestra el resumen de la cita o mensje de error en caso de no pasar la validación
 mostrarResumen();

 //Agregar nombre a la cita
 agregarNombre();

 //Agrega la fecha a la cita
 fechaCita();

 //Deshabilita fechas anteriores
  deshabilitarFechasAnterior();

  //Almacena la hora de la cita en el objeto
  horaCita();

//Saber el dia de la cita
   diaSemana();

//Cambiando el formato de hora a 12
   	 tConvert();
}
function mostrarSeccion(){

	//Tienes que estra de primera eliminar antes que agrega
    //Elimina la clase mostrar seccion de la seccion anterior
    const seccionAnterior=document.querySelector('.mostrar-seccion')
    if (seccionAnterior) {
    	seccionAnterior.classList.remove('mostrar-seccion');
    }
	
	//Agrega mostrar-seccion donde dimos click
	const seccionActual =document.querySelector(`#paso-${pagina}`); //Muestra la primera pagina
	seccionActual.classList.add('mostrar-seccion');
 
    //Elimina la clase actual del tab anterior
    const tabA=document.querySelector('.tabs .actual');
    if (tabA) {
    	tabA.classList.remove('actual');
    }
	
	//Resaltar el tab actual
	const tab=document.querySelector(`[data-paso='${pagina}']`);
	tab.classList.add('actual');
}
function cambiarSeccion(){
	const enlaces=document.querySelectorAll('.tabs button') //Seleccionando todos los botones
	enlaces.forEach( enlace=> {      //Iterando sobre los enlaces ya que son tres con un arrow function
		enlace.addEventListener('click', e=>{  //escuchando por un click y arrow function
			e.preventDefault();
			pagina=parseInt(e.target.dataset.paso); //Cambiar paginacion
			
				//Llamar la funcion de mostrarSeccion
				mostrarSeccion();

				botonesPaginador();
		})
	});
}
async function Mostrar_Servicios(){
	try {
		const resultado= await fetch('./servicios.json'); //Llamando al archivo
		const db= await resultado.json(); //Diciendole que es un archivo json
		const { servicios }=db; //Destructing, los datos de db se almacenan en servicios

		//Generar el HTML
		servicios.forEach( servicio => { //Crear el forEach pra recorer el json
		 const {id, nombre, precio} =servicio; // Extraer los datos de servicio mediante un Destructing

		 //Dom Scripting

		 const nombreServicio=document.createElement('P'); //Creamos una etiqueta p con dom scritping
         nombreServicio.textContent=nombre;
         nombreServicio.classList.add('nombre-servicio');
         
         //Precio
         const precioServicio=document.createElement('P');
		 precioServicio.textContent=`$ ${precio}`;
         precioServicio.classList.add('precio-servicio');
         
         //Generar Div
         const servicioDiv=document.createElement('DIV');
         servicioDiv.classList.add('servicio');
         servicioDiv.dataset.idServicio=id; //Saber el id del Servicio
         
         //Seleciona un servicio
         servicioDiv.onclick=selectServicio;
         
         //Inyectar precio y servicio al Div de servicio
         servicioDiv.appendChild(nombreServicio);
         servicioDiv.appendChild(precioServicio);
         
         //Inyectarlo en el HTML
         //Creas un id en la etiqueta donde quieres inyectarlo
         document.querySelector('#servicios').appendChild(servicioDiv);
         //console.log(servicioDiv);
		 
		}); 
		
	} catch(error) {
		// statements
		console.log(error);
	}

	function selectServicio(e){
    let elemento;
    //Forzar que el elemento al cul damos click sea el DIV
    if (e.target.tagName==='P') { //Si al que le dimos click fue un Parrafo entonces
    	elemento=e.target.parentElement; //elemento es igual a su padre (DIV)
    }else {
    	elemento=e.target; //Sino fue un parrafo entonces fue al div 
     }
     //console.log(elemento.dataset.idServicio); Mostar el id del servicio en consola

     if (elemento.classList.contains('seleccionado')) { //Saber si el elemento tiene la clase seleccionado
     	elemento.classList.remove('seleccionado') //Si la tiene se la quitamos
     	const id=parseInt(elemento.dataset.idServicio);
     	eliminarServicio(id);
     } else {
     	elemento.classList.add('seleccionado'); //Si no la tiene se la agregamos
        const servicioObj={
        	id: parseInt(elemento.dataset.idServicio),
        	nombre:elemento.firstElementChild.textContent,
        	precio:elemento.firstElementChild.nextElementSibling.textContent
        }
     	agregarServicio(servicioObj);
     }
     
	}
}

function agregarServicio(servicioObj){
	const{servicios}=cita;
	cita.servicios=[...servicios, servicioObj]; //Copiando los servicios y agg servivioOBJ
console.log(cita);
}
function eliminarServicio(id){
	const{servicios}=cita;
	cita.servicios= servicios.filter(servicio=>servicio.id !==id); //Elimando el id, es decir me tienes que traer el id que sea diferente a los que tu elimaste
	console.log(cita);
}
function paginaSiguiente(){
const paginaS=document.querySelector('#siguiente');
paginaS.addEventListener('click', () =>{
pagina++;
botonesPaginador()
console.log(pagina);
} )
}
function paginaAnterior(){
const paginaA=document.querySelector('#anterior');
paginaA.addEventListener('click', () =>{
pagina--;
botonesPaginador()
})
}

function botonesPaginador(){
	const paginaS=document.querySelector('#siguiente');
	const paginaA=document.querySelector('#anterior');

	if (pagina===1) {
   paginaA.classList.add('ocultar');
	} else if (pagina===3) {
			paginaS.classList.add('ocultar');
			paginaA.classList.remove('ocultar');
			mostrarResumen();//Estamos en ´la pagina 3, carga el resumen de la cita
				} else {
        paginaA.classList.remove('ocultar');
		paginaS.classList.remove('ocultar');
				}
	mostrarSeccion() //Cambia la seccion que se muestra por la de la pagina	

}

function mostrarResumen(){
  //Destructuring
  const {nombre, fecha, hora, servicios}=cita; //Extrayendo los atributos de de la cita
  const {dia}=cita;
   //Selecionar el resumen
   const resumenDiv=document.querySelector('.contenido-resumen');
   
   //Limpiar el html previo con while
   while (resumenDiv.firstChild) { //Mientras contenido resumen tenga html
   	resumenDiv.removeChild(resumenDiv.firstChild);
   }
  //Validacion
  if (Object.values(cita).includes('')) { //Si los objetos de la cita estan vacios
  	const noServicio=document.createElement('P');
  	noServicio.textContent='Faltan datos de Servicios, fecha, hora o nombre';
  	noServicio.classList.add('invalidar-cita');

  	//Agregando noServicios a resumenDiv
  	resumenDiv.appendChild(noServicio);
  	return;
  }
  
  const headingCita=document.createElement('H3');
   headingCita.textContent='Resumen de Cita';
  
  //Mostrar resumen

   const nombreCita=document.createElement('P');
   nombreCita.innerHTML=`<span>Nombre:</span> ${nombre}`;
   const fechaCita=document.createElement('P');
   fechaCita.innerHTML=`<span>Fecha:</span> ${dia} ${fecha}`;
   
   const horaCita=document.createElement('P');
   horaCita.innerHTML=`<span>Hora:</span> ${hora}`;

   const contenedorCita=document.createElement('DIV');
   contenedorCita.classList.add('resumen-servicios');

   const headingServicio=document.createElement('H3');
   headingServicio.textContent='Resumen de los Servicios';

   contenedorCita.appendChild(headingServicio);

   let cantidad = 0;
   
   //Mostrando lo servicios en el resumen con un foreach
    
    servicios.forEach(servicios => {
    const {nombre, precio}=servicios;
    const contenedorServicios=document.createElement('DIV');
    contenedorServicios.classList.add('contenedor-servicios');
    
    const textoServicio=document.createElement('P');
    textoServicio.textContent=nombre;
    
    const precioServicio=document.createElement('P');
    precioServicio.textContent=precio;
    precioServicio.classList.add('precio');

    const totalServicio=precio.split('$');

    cantidad += parseInt(totalServicio[1].trim())

    contenedorServicios.appendChild(textoServicio);
    contenedorServicios.appendChild(precioServicio);
    contenedorCita.appendChild(contenedorServicios);
    

    })
   resumenDiv.appendChild(headingCita);
   resumenDiv.appendChild(nombreCita);
   resumenDiv.appendChild(fechaCita);
   resumenDiv.appendChild(horaCita);
   resumenDiv.appendChild(contenedorCita);

   const totalPagar =document.createElement('P');
   totalPagar.classList.add('total');
   totalPagar.innerHTML=`<span>Total a Pagar: </span> $ ${cantidad}`;
   resumenDiv.appendChild(totalPagar);

}

function agregarNombre(){
	const nombreInput=document.querySelector('#nombre');
	nombreInput.addEventListener('input', e=>{
		const nombreTexto=e.target.value.trim(); //No contar espacios en blanco

		//Validacion nombre no puede estar vacio
		if (nombreTexto==='' || nombreTexto.length<2) {
			mostrarAlerta('Nombre no valido', 'error')
					}else {
						const alerta=document.querySelector('.alerta');
						if (alerta) {
							alerta.remove();
						}
					cita.nombre=nombreTexto;	
					}
	})
}

function mostrarAlerta(mensaje, tipo){

	//Si hay una alerta previa no crear otra
	const alertaPrevia=document.querySelector('.alerta');
	if (alertaPrevia) {
		return;
	}
	const alerta=document.createElement('DIV');
	alerta.textContent=mensaje;
	alerta.classList.add('alerta');

	if (tipo==='error') {
		alerta.classList.add('error');
	}

	//Insertar al HTML
	const formulario=document.querySelector('.formulario');
	formulario.appendChild(alerta);
	

	//Eliminar la alerta despues de 5 segundos
	setTimeout(()=>{
		alerta.remove()
	},5000);
}

function fechaCita(){
	const fecha=document.querySelector('#fecha');
	fecha.addEventListener('input', e=>{
		const dia=new Date(e.target.value).getUTCDay() //Transformandolo a fecha
		                                                //getUtcDay cambia 0 es domingo etc

		const opciones={
			weekday:'long',
			month:'2-digit',
			year:'numeric',
			day:'numeric'
		}
		dia.toLocaleString('es-ES', opciones); //Fecha en español
       
		//Validacion para saber si seleccionaste un fin de semana
		if ([0, 6].includes(dia)) {
			e.preventDefault(); //Resetear el input si eliges fin de semana
			fecha.value='';//Resetear el input si eliges fin de semana
			mostrarAlerta('Fines de semana no permitidos', 'error');
		}else {

			cita.fecha=fecha.value.split('-').reverse().join('/');
			
			
			console.log(cita);
			
		}
	})
}

function deshabilitarFechasAnterior(){
	const inputFecha=document.querySelector('#fecha');
	// Formato año-mes-dia, evaluando el dia de hoy
	
	const fechaAhora= new Date() //Fecha de hoy
	// inputFecha.min = fechaAhora.toLocaleDateString('en-ZA');
   const dia = (fechaAhora.getDate()).toString().padStart(2, '0');//Dia actual 
   const mes = (fechaAhora.getMonth() + 1).toString().padStart(2, '0');//Mes actual más 1 porque se inicia en 0 y no existe un mes 0
	  
	const year = fechaAhora.getFullYear(); //Año actual
	const fechaDeshabilitar = `${year}-${mes}-${dia}`;
	   
	   
	inputFecha.min = fechaDeshabilitar;
	

	
     
}
function diaSemana(){
	const{dia}=cita;
	const fecha=document.querySelector('#fecha');
	fecha.addEventListener('input', e=>{
	const dias=new Date(e.target.value);
    

    nombreD=[
     'Lunes',
     'Martes',
     'Miércoles',
     'Jueves',
     'Viernes',
    ]
    cita.dia=nombreD[dias.getDay()];
   

	
	console.log(cita);
})
}


function horaCita(){
	const Inputhora=document.querySelector('#hora');
   Inputhora.addEventListener('input', e=>{
   const horaCita=e.target.value
   const hora=horaCita.split(':'); //Separando la hora en dos para validar solo la hora no los minutos
   if (hora[0] < 10 || hora[0]>18 ) {
   	mostrarAlerta('Hora no valida', 'error');
   	setTimeout(()=>{
		Inputhora.value='';
	},3000);
   } 

   else{
   	cita.hora=horaCita;
   
   	
   	console.log(cita);
   }
   })

}
function tConvert() {
  // Check correct time format and split into components
  const Inputhora=document.querySelector('#hora');
  Inputhora.addEventListener('input', e=>{ 
  const horaCita=e.target.value;
  var hora=horaCita.split(':');
  var ampm;
  if (hora[0]>12) {
  	hora[0]=hora[0] - 12;
  	hora= `${hora[0]}:${hora[1]}`;
  	ampm='PM';
  }else{
  	hora= `${hora[0]}:${hora[1]}`;
  	ampm='AM';
  }
  
  	cita.hora=`${hora} ${ampm}`;

  


  // horaCita.toLocaleDateString('en-US');
  
  // cita.hora
  console.log(cita);
  console.log(hora[0]);
  
})
}
// $(document).ready(function(){ 
// 	$(function deshabilitarFechasAnterior(){
// 	// const fechaAhora= new Date();
// 	// const year=fechaAhora.getFullYear();
// 	// const mes=fechaAhora.getMonth() + 1;
// 	// const dia=fechaAhora.getDate()+ 1;
// 	// const fechaD=year+'-'+mes+'-'+dia;
// 	$("#fecha").datepicker({
// 	minDate:new Date(),
// 	firstDay: 1,
// 	monthNames: ['Enero', 'Febreo', 'Marzo','Abril', 'Mayo', 'Junio',				'Julio', 'Agosto', 'Septiembre',
// 				'Octubre', 'Noviembre', 'Diciembre'],
// 	dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
// 	dateFormat:'yy-mm-dd'
// 	})	 	
// })

	
// 	console.log(cita);
// });