let intentos = 0
function validarAcceso() {
    let usuarioEscrito = document.getElementById("usuario").value;
    let claveEscrita = document.getElementById("clave").value;
    if (usuarioEscrito === "Geralt" && claveEscrita === "De Rivia") {
        document.getElementById("login").style.display = "none";
        document.getElementById("contenido_de_la_pagina").style.display = "block";
        document.getElementById("titulo").textContent = "Gerat De Rivia";
        document.getElementById("sustitulo").textContent = "Geralt de Rivia es un personaje de la saga de videojuegos The wicher";
        document.getElementById("imagen").src = "Geralt.jpg";
        document.getElementById("sustitulos2").textContent = "Es fomoso en su mundo por ser un gran cazador de mostruos y es conocido por 'Supuestamente matar al rey Fortest'";
        let visitas = Number(localStorage.getItem("visitasContador")) || 0;
        visitas++;
        localStorage.setItem("visitasContador", visitas);
        document.getElementById("contador-visitas").textContent = "Has entrado a esta página " + visitas + " vez/veces.";
    } else {
        intentos++
        if (intentos >= 3) {
            document.getElementById("mensaje-error").textContent = "Acceso Bloqueado"
            document.getElementById("usuario").disabled = true;
            document.getElementById("clave").disabled = true;
        } else {
            let restantes = 3 - intentos;
            document.getElementById("mensaje-error").textContent = "Te quedan " + restantes + " intento(s)";
        }
        
    }
}