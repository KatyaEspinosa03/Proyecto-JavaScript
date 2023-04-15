// SIMULADOR DE UN PRESTAMO 

// DECLARO LA VARIABLE CANTIDAD Y EDAD DE MANERA GLOBAL PORQUE SERÁ UTILIZADA EN DIFERENTES FUNCIONES. 
let cantidad;
let edad = false 
let informacion = false
//OBJETO 

//ARRAY PARA GUARDAR LA INFORMACION QUE EL USUARIO INGRESA. COMO SI FUERA EL HISTORIAL 
let myArray = []
// COMIENZA PIDIENDOLE AL USUARIO POR SU INFORMACIÓN GENERAL. 

function informacionGeneral(){
    let name;
    let lastName;

    do {
        name = prompt("Ingrese su nombre")
        lastName = prompt("Ingrese su apellido")
        myArray.push(name, lastName)
    

    if (name == "" || lastName == "") {
        alert("Introduzca un dato valido")
    } else {
        informacion = true
        alert("Bienvenido," + name + " " + lastName)
    }
    } while(informacion == false)

    do {
        let age = prompt("Ingrese su edad") 
        if (age == ""){
            alert("Introduzca su edad, por favor.")
        }else if(/\D/.test(age)){
            alert("Introduzca un valor numérico")
    }else if(age <= "18"){
        alert("No podemos otorgarle un préstamo porque es menor de edad.") 
        break
    } else if(age >= 85) {
        alert("No podemos otorgarle un préstamo porque sobrepasa el máximo de edad.")
        break
    } else {
        alert("Felicidades," + name + " " + lastName + " " + "puedes aplicar para un crédito. \n Da aceptar para continuar")
        edad = true
        
    }
} while(edad == false)


}



// CREO FUNCION DE CANTIDAD PARA RECAUDAR LA CANTIDAD QUE EL USUARIO DESEA ADQUIRIR

function cantidadPrestamo(){

// DECLARO LA VARIABLE DE PRESTAMO CANTIDAD COMO FALSO PORQUE LA CANTIDAD AUN NO HA SIDO INGRESADA POR EL USUARIO. 
let prestamoCantidad = false

do{
    cantidad = parseInt(prompt("Ingrese la cantidad que desea obtener"))
    myArray.push(cantidad)

    if (cantidad < 2500){
        alert("La cantidad minima a solicitar es 2,500. Ingrese otra cantidad.")
    }else if(/\D/.test(cantidad)){
            alert("Introduzca un valor numérico")
    }else if(cantidad > 150000){
        alert("La cantidad máxima a solicitar es 150,000. Ingrese otra cantidad.")
    } else {
    alert("La cantidad a solicitar es" + " " + cantidad)
    prestamoCantidad = true
    break
    }
} while(prestamoCantidad == false)

}


// FUNCION PARA QUE EL USUARIO ESCOGA LAS CUOTAS EN LAS QUE DESEA PAGAR EL PRESTAMO Y CALCULAR EL INTERES. 
function cuotasPrestamo (){
    let cuotas = prompt("Escoga el número de cuotas a pagar su préstamo. \n Pueden ser: 6, 12, 18 o 24 mensualidades.")
    let totalInteres;
    let pagoTotal;

    switch(cuotas) {
        case "6":
            totalInteres = (cantidad * 10)/100
            pagoTotal = (totalInteres + cantidad)/6
            alert("Has escogido 6 cuotas, tendrás una tasa de interes de 10%. \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
            break
        case "12": 
            totalInteres = (cantidad * 12)/100
            pagoTotal = (totalInteres + cantidad)/12
            alert("Has escogido 12 cuotas, tendrás una tasa de interes de 12% \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
            break
        
        case "18":
            totalInteres = (cantidad * 16)/100
            pagoTotal = (totalInteres + cantidad)/18
            alert("Has escogido 18 cuotas, tendrás una tasa de interes de 16% \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
            break

        default:
            totalInteres = (cantidad * 20)/100
            pagoTotal = (totalInteres + cantidad)/24
            alert("Has escogido 24 cuotas, tendrás una tasa de interes de 20% \n Tus interes será:" + totalInteres + 
            "\n En total pagarás" + " " + pagoTotal +" " + "al mes.")
            break
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

informacionGeneral()
// AGREGO IF PARA QUE EL PROGRAMA PUEDA CONTINUAR SI LA PERSONA TIENE MÁS DE 18 AÑOS Y LA EDAD NO ES NULL, SINO ES ASÍ LAS DEMÁS FUNCIONES NO SE EJECUTAN
if (edad == true && informacion == true){
    cantidadPrestamo()
    cuotasPrestamo()
    aceptarPrestamo()
}



console.log(myArray)