//SIMULADOR DE UN PRESTAMO 


// ENLAZO MIS IDS DE HTML. 

let age = document.getElementById("age")
let cantidad = document.getElementById("cantidad")
let cuotas = document.getElementById("cuotas")
let clientName = document.getElementById("clientName")
let lastName = document.getElementById("lastName")
let formulario = document.getElementById("myForm")
let mensajes = document.getElementById("mensajes")
let boton = document.getElementById("boton")

//OBJETO EN DONDE SE ALMACENARA EL NOMBRE Y EDAD DEL CLIENTE 
const Cliente = function(name, lastName, age){
    this.name = name
    this.lastName = lastName
    this.age = age

}
//ARRAY PARA GUARDAR LA INFORMACION QUE EL USUARIO INGRESA. COMO SI FUERA EL HISTORIAL 
let myArray = []


// SE AGREGAN EVENTS A LOS ELEMENTOS

age.addEventListener("change", edadCliente)
age.addEventListener("focusout", edadFocusOut)
clientName.addEventListener("keyup", validaNombre)
lastName.addEventListener("keyup", validaLastName)
age.addEventListener("change", informacionGeneral)
cantidad.addEventListener("change", cantidadPrestamo)
cantidad.addEventListener("focusout", cantidadFocusOut)
cuotas.addEventListener("change", cuotasPrestamo)



// FUNCION PARA VALIDAR QUE LOS DATOS AGREGEDOS EN CLIENTNAME Y LASTNAME SEAN LETRAS Y BORRAR TODO LO QUE NO SEA LETRAS
function validaNombre() {
    let letters = /^[A-Za-z- ]+$/;
    if (!clientName.value.match(letters)){
        clientName.value = clientName.value.slice(0, -1);
    }
}

function validaLastName(){
    let letters = /^[A-Za-z- ]+$/;
    if (!lastName.value.match(letters)){
        lastName.value = lastName.value.slice(0, -1);
    } 
}

// FUNCION PARA GUARDAR LA INFORMACIÓN DEL USUARIO EN EL OBJETO Y AGREGARLO AL ARRAY
function informacionGeneral(){
let nuevoCliente = new Cliente(clientName.value, lastName.value, age.value)
myArray.push(nuevoCliente)
}
// FUNCION PARA VALIDAR LA EDAD
function edadCliente(){
    if(age.value <= 18){
        mensajes.innerHTML =
        ` <div class="col-md-12 text-left text-justify mensaje">
                <p> No podemos otorgarle un préstamo porque es menor de edad </p>
            </div> ` 
        age.value = null 
        age.onfocus
    } else if(age.value >= 85) {
        mensajes.innerHTML =
        ` <div class="col-md-12 text-left text-justify mensaje">
                <p> No podemos otorgarle un préstamo porque sobrepasa el máximo de edad. </p>
            </div> `
    } 
}
// FUNCION PARA REGRESAR EL FOCUS A LA EDAD SI SE DEJO EN BLANCO 
function edadFocusOut() {
    if (age.value == "") {
        age.placeholder = "Agrega tu edad"
        age.onfocus
    } 
}


// CREO FUNCION DE CANTIDAD PARA RECAUDAR LA CANTIDAD QUE EL USUARIO DESEA ADQUIRIR

function cantidadPrestamo(){

    if (cantidad.value < 2500){
        mensajes.innerHTML =
        `<div class="col-md-12 text-left text-justify mensaje">
                <p> La cantidad minima a solicitar es 2,500. Ingrese otra cantidad. </p>
            </div> `
    }else if(cantidad.value > 150000){
        mensajes.innerHTML =
        ` <div class="col-md-12 text-left text-justify mensaje">
                <p> La cantidad máxima a solicitar es 150,000. Ingrese otra cantidad. </p>
            </div> `
    }
    myArray.push(cantidad.value)

}

// FUNCION PARA REGRESAR EL FOCUS A CANTIDAD SI SE DEJO EN BLANCO 

function cantidadFocusOut() {
    if (cantidad.value == ""){
        cantidad.placeholder = "Agrega una cantidad"
        cantidad.onfocus
    } 
}

// FUNCION PARA QUE EL USUARIO ESCOGA LAS CUOTAS EN LAS QUE DESEA PAGAR EL PRESTAMO Y CALCULAR EL INTERES. 
function cuotasPrestamo (){
    let totalInteres;
    let pagoTotal;

    if(cuotas.value == 6 || cuotas.value == 12 || cuotas.value == 18 || cuotas.value == 24){
        totalInteres = (cantidad.value * 10)/100
        pagoTotal = (totalInteres + parseFloat(cantidad.value))/cuotas.value
        mensajes.innerHTML =
    ` <div class="col-md-12 text-left text-justify mensaje">
            <p> Has escogido ${cuotas.value} cuotas, tendrás una tasa de interes de 10%. \n Pagarás $${totalInteres} de interés total.
            \n En total pagarás $${pagoTotal} al mes. </p>
        </div> `
        } else {
            mensajes.innerHTML =
            `<div class="col-md-12 text-left text-justify mensaje">
                    <p> No tenemos ese numero de cuotas disponibles. </p>
                </div> `
        }

    myArray.push(cuotas.value, totalInteres, pagoTotal)
}

// SE AGREGA UN EVENTO DE SUMBIT AL FORMULARIO Y SE AGREGA LA FUNCION PARA QUE EL USUARIO DECIDA SI QUIERE O NO ACEPTAR EL PRESTAMO. 


formulario.addEventListener("submit", function(event){

    event.preventDefault();

    let aceptarPrestamo = confirm("¿Te gustaría aceptar el préstamo?")

    if (aceptarPrestamo == true) {
        mensajes.innerHTML =
        `<div class="col-md-12 text-left text-justify mensaje">
                <p> Felicidades, has obtenido un préstamo por la cantidad de ${cantidad.value}. </p>
            </div> `
    } 
})



// CREO FUNCION PARA ALMACENAR LA INFORMACION DEL LOCAL STORAGE 

boton.addEventListener("click", localStorageFormulario)

function localStorageFormulario() {

    localStorage.setItem("Nombre", clientName.value)
    localStorage.setItem("Apellido", lastName.value)
    localStorage.setItem("Edad", age.value)
    localStorage.setItem("Cantidad", cantidad.value)
    localStorage.setItem("Cuotas", cuotas.value)
}

// LLAMO A MI ARRAY PARA VER CUAL FUE LA INFORMACIÓN QUE SE ALMACENÓ 

console.log(myArray)
