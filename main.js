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
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'No podemos otorgarle un préstamo porque es menor de edad'
        })
        age.value = null 
        age.onfocus
    } else if(age.value >= 85) {
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'No podemos otorgarle un préstamo porque sobrepasa el máximo de edad.'
        })
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
        Swal.fire({
            icon: 'warning',
            title: 'Cantidad no válida',
            text: 'La cantidad mínima a solicitar es $2,500. Ingrese otra cantidad',
        })
    }else if(cantidad.value > 150000){
        Swal.fire({
            icon: 'warning',
            title: 'Cantidad no válida',
            text: 'La cantidad máxima a solicitar es $150,000. Ingrese otra cantidad.',
        })
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
    let interes = 10

    // IF PARA CAMBIAR EL VALOR DEL INTERES DEPENDIENDO DE LAS CUOTAS ESCOGIDAS
    if (cuotas.value == 6) {
        interes += 2
    } else if (cuotas.value == 12){
        interes += 4
    }else if (cuotas.value == 18){
        interes += 6
    }else if (cuotas.value == 24){
        interes += 8
    }

    if(cuotas.value == 6 || cuotas.value == 12 || cuotas.value == 18 || cuotas.value == 24){
        totalInteres = (cantidad.value * interes)/100
        pagoTotal = (totalInteres + parseFloat(cantidad.value))/cuotas.value
        Swal.fire({
            icon: 'info',
            text: "Has escogido" + " " + cuotas.value + " " + "cuotas, tendrás una tasa de interes del" + " "+ interes +"%. \n Pagarás $" + totalInteres + " " +
            "de interés total. En total pagarás $" + pagoTotal + " " + "al mes"
        })
        } else {
            Swal.fire({
                icon: 'error',
                text: 'No tenemos ese numero de cuotas disponibles. Ingresa un número de cuotas válido'
            })
            cuotas.value = null
        }

    myArray.push(cuotas.value, totalInteres, pagoTotal)
}

// SE AGREGA UN EVENTO DE SUMBIT AL FORMULARIO Y SE AGREGA LA FUNCION PARA QUE EL USUARIO DECIDA SI QUIERE O NO ACEPTAR EL PRESTAMO. 


formulario.addEventListener("submit", function(event){

    event.preventDefault();

    // VALIDO QUE NO HAYAN QUEDADO CAMPOS EN BLANCO, SI ES ASÍ APARECE UN ERROR PIDIENDO AL USUARIO QUE AGREGE LA 
    // INFORMACION QUE FALTA 
if (clientName.value == " " || lastName.value == " " || age.value == "" || cantidad.value == "" || cuotas.value == "") {
    Swal.fire({
        icon: 'error',
        text: 'Rellena todos los campos antes de continuar.'
    })

    // SI TODOS LOS DATOS SON VALIDOS, EL PROGRAMA CONTINUA CON LA CONFIRMACIÓN 
} else{
    Swal.fire({
        title: '¿Te gustaría aceptar el préstamo',
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
        setTimeout(() => {Swal.fire("Felicidades," + " " + clientName.value + " " + lastName.value + "," 
        + "has obtenido tu préstamo por la cantidad de" + " " + "$" + cantidad.value)}, 2000)

        Swal.fire('Un momento, estamos procesando tu solicitud')

        } else if (result.isDenied) {
            Swal.fire('Solicitud cancelada')
        }
    })}
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
// recupero datos del forumalario para hacer autorelleno 

function recuperarFormulario(){
    clientName.value = localStorage.getItem("Nombre")
    lastName.value = localStorage.getItem("Apellido")
    age.value = localStorage.getItem("Edad")
}
recuperarFormulario()

// LLAMO A MI ARRAY PARA VER CUAL FUE LA INFORMACIÓN QUE SE ALMACENÓ 

console.log(myArray)
