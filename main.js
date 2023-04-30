//SIMULADOR DE UN PRESTAMO 


//DECLARO LA VARIABLE CANTIDAD Y EDAD DE MANERA GLOBAL PORQUE SERÁ UTILIZADA EN DIFERENTES FUNCIONES Y ENLAZO MIS IDS DE HTML. 

let edad = false 
let informacion = false
let age = document.getElementById("age")
let cantidad = document.getElementById("cantidad")
let cuotas = document.getElementById("cuotas")
let clientName = document.getElementById("clientName")
let lastName = document.getElementById("lastName")


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
clientName.addEventListener("input", informacionGeneral)
lastName.addEventListener("input", informacionGeneral)
age.addEventListener("input", informacionGeneral)
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
let nuevoCliente = new Cliente(clientName, lastName, age)
myArray.push(nuevoCliente)
}
// FUNCION PARA VALIDAR LA EDAD
function edadCliente(){
    if(age.value <= 18){
        alert("No podemos otorgarle un préstamo porque es menor de edad.")
        age.value = null 
        age.onfocus
    } else if(age.value >= 85) {
        alert("No podemos otorgarle un préstamo porque sobrepasa el máximo de edad.")
    } 
}
// FUNCION PARA REGRESAR EL FOCUS A LA EDAD SI SE DEJO EN BLANCO 
function edadFocusOut() {
    if (age.value == "" ){
        alert("Agrega tu edad")
        age.onfocus
    }
}


// CREO FUNCION DE CANTIDAD PARA RECAUDAR LA CANTIDAD QUE EL USUARIO DESEA ADQUIRIR

function cantidadPrestamo(){

    if (cantidad.value < 2500){
        alert("La cantidad minima a solicitar es 2,500. Ingrese otra cantidad.")
    }else if(cantidad.value > 150000){
        alert("La cantidad máxima a solicitar es 150,000. Ingrese otra cantidad.")
    }
    myArray.push(cantidad)

}

// FUNCION PARA REGRESAR EL FOCUS A CANTIDAD SI SE DEJO EN BLANCO 

function cantidadFocusOut() {
    if (cantidad.value == "") {
        alert("ingresa una cantidad")
        cantidad.onfocus
    }
}

// FUNCION PARA QUE EL USUARIO ESCOGA LAS CUOTAS EN LAS QUE DESEA PAGAR EL PRESTAMO Y CALCULAR EL INTERES. 
function cuotasPrestamo (){
    let totalInteres;
    let pagoTotal;

    if (cuotas.value = 6) {
            totalInteres = (cantidad.value * 10)/100
            pagoTotal = (totalInteres + cantidad.value)/6
            alert("Has escogido 6 cuotas, tendrás una tasa de interes de 10%. \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
    } else if (cuotas.value = 12){ 
            totalInteres = (cantidad * 12)/100
            pagoTotal = (totalInteres + cantidad)/12
            alert("Has escogido 12 cuotas, tendrás una tasa de interes de 12% \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
    } else if (cuotas.value = 18) {
            totalInteres = (cantidad * 16)/100
            pagoTotal = (totalInteres + cantidad)/18
            alert("Has escogido 18 cuotas, tendrás una tasa de interes de 16% \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
    } else{
            totalInteres = (cantidad * 20)/100
            pagoTotal = (totalInteres + cantidad)/24
            alert("Has escogido 24 cuotas, tendrás una tasa de interes de 20% \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
    }

    myArray.push(cuotas, totalInteres, pagoTotal)
}

// FUNCION PARA QUE EL USUARIO DECIDA SI QUIERE O NO ACEPTAR EL PRESTAMO. 

function aceptarPrestamo(){

    let aceptarPrestamo = confirm("¿Te gustaría aceptar el préstamo?")

    if (aceptarPrestamo == true) {
        alert("Felicidades, has obtenido tu préstamo.")
    } 
}

if (informacion == true)
informacionGeneral()
// AGREGO IF PARA QUE EL PROGRAMA PUEDA CONTINUAR SI LA PERSONA TIENE MÁS DE 18 AÑOS Y LA EDAD NO ES NULL, SINO ES ASÍ LAS DEMÁS FUNCIONES NO SE EJECUTAN
if (edad == true && informacion == true){
    cantidadPrestamo()
    cuotasPrestamo()
    aceptarPrestamo()
}


// LLAMO A MI ARRAY PARA VER CUAL FUE LA INFORMACIÓN QUE SE ALMACENÓ 
console.log(myArray)