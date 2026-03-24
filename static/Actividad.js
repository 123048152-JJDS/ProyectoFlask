var nombre = "Jesus";
const apellido = "Jimenez";
let edad = 24;

// JSON Java Script Object Notation

const datos = '{"nombre":"Jesus", "Apellido":"Jimenez", "Edad":24}';
datos.nombre = "Juan";

//""    ''  ``

let etiqueta = `<p id "idTexto"> Texto </p>`

function ejemplo(){
    let ejemplo = "example";
    var example = ""
}

function Nombre(){
    let nombre = document.getElementById("txtNombre");
    let etiqueta = document.getElementById("lblNombre");
    console.log(nombre.value);
    //alert('Hola ' + nombre);
    nombre.type = "password";
    etiqueta.style.color = "red";
}

// function Condicion(){
//     if(){

//     }else if(){

//     } ... {

//     } else {

//     } ...

//     switch(){
//         case 1: break;
//         case 2: break
//         .
//         .
//         .
//         default: break
//     }
// }

// function Calcular() {
//     const valorUno = parseFloat(document.getElementById('txtValorUno').value);
//     const valorDos = parseFloat(document.getElementById('txtValorDos').value);
//     const operacion = document.getElementById('txtOperacion').value.toUpperCase();
//     const resultadoInput = document.getElementById('txtResultado');


//     if (isNaN(valorUno) || isNaN(valorDos)) {
//         resultadoInput.value = "Error: Valores inválidos";
//         return;
//     }

//     switch(operacion) {
//         case 'S': // Suma
//             resultado = valorUno + valorDos;
//             break;
//         case 'R': // Resta
//             resultado = valorUno - valorDos;
//             break;
//         case 'M': // Multiplicación
//             resultado = valorUno * valorDos;
//             break;
//         case 'D': // División
//             if (valorDos === 0) {
//                 resultadoInput.value = "Error: División por cero";
//                 alert("Error: División por cero");
//                 return;
//             }
//             resultado = valorUno / valorDos;
//             break;
//         default:
//             resultadoInput.value = "Operación inválida (S,R,M,D)";
//             return;
//     }
    
//     resultadoInput.value = resultado;
// }

function Calcular(opcion) {
    const valorUno = parseFloat(document.getElementById('txtValorUno').value);
    const valorDos = parseFloat(document.getElementById('txtValorDos').value);
    const resultadoInput = document.getElementById('txtResultado');
    let operacion = "";

    if(opcion && opcion !== "0") {
        operacion = opcion;
    } else {
        operacion = document.getElementById('txtOperacion').value.toUpperCase();
    }

    if (isNaN(valorUno) || isNaN(valorDos)) {
        resultadoInput.value = "Error: Valores inválidos";
        return;
    }

    let resultado;
    switch(operacion) {
        case 'S': // Suma
            resultado = valorUno + valorDos;
            break;
        case 'R': // Resta
            resultado = valorUno - valorDos;
            break;
        case 'M': // Multiplicación
            resultado = valorUno * valorDos;
            break;
        case 'D': // División
            if (valorDos === 0) {
                resultadoInput.value = "Error: División por cero";
                alert("No se puede dividir el primer numero entre cero");
                return;
            }
            resultado = valorUno / valorDos;
            break;
        default:
            resultadoInput.value = "Operación inválida (S,R,M,D)";
            return;
    }
    
    resultadoInput.value = resultado;
    console.log(resultado);
}

function Ciclos() {
    console.log("For");
    for(let i=0; i<5; i++){
        console.log(i);
    }

    console.log("Do-While");
    let j = 0;
    do {
        console.log(j);
        j++;
    } while(j<5);

    console.log("While");
    let h = 0;
    while(h<5) {
        console.log(h);
        h++;
    }
}

let numero = Math.floor(Math.random() * 100) + 1;
let intentosCount = 0;

function verificarIntento() {
    const intentoInput = document.getElementById('intento');
    const mensaje = document.getElementById('mensaje');
    const intentosDisplay = document.getElementById('intentos');
    
    const numeroUsuario = parseInt(intentoInput.value);
    
    if (isNaN(numeroUsuario)) {
        mensaje.textContent = 'Por favor ingresa un número válido';
        return;
    }
    
    if (numeroUsuario < 1 || numeroUsuario > 100) {
        mensaje.textContent = "Por favor, ingresa un número entre 1 y 100.";
        return;
    }
    
    intentosCount++;
    intentosDisplay.textContent = `Intentos: ${intentosCount}`;
    
    if (numeroUsuario === numero) {
        mensaje.textContent = `¡Felicidades! Has adivinado el número en ${intentosCount} intentos. El resultado es ${numero} `;
        // alert("El resultado era: "+numero)
    } else if (numeroUsuario < numero) {
        mensaje.textContent = "El número es mayor. Inténtalo de nuevo.";
    } else {
        mensaje.textContent = "El número es menor. Inténtalo de nuevo.";
    }
    intentoInput.value = '';
}

function reiniciarJuego() {
    numero = Math.floor(Math.random() * 100) + 1;
    intentosCount = 0;
    document.getElementById('intentos').textContent = 'Intentos: 0';
    document.getElementById('mensaje').textContent = '';
    document.getElementById('intento').value = '';
}