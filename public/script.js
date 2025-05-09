const invitados = {
  ST100: { nombre: "Steven Thornton", pases: 0 },
  K101: { nombre: "Kali", pases: 0 },
  B102: { nombre: "Brittany", pases: 0 },
  S103: { nombre: "Sabrina", pases: 0 },
  PT104: { nombre: "Penny Thornton", pases: 0 },
  ST105: { nombre: "Steve Thornton", pases: 0 },
  AS106: { nombre: "Alexander Socorro", pases: 0 },
  NW107: { nombre: "Nathan Whaley", pases: 1 },
  RW108: { nombre: "Robert Walton", pases: 0 },
  A109: { nombre: "Alvin", pases: 1 },
  MT110: { nombre: "Michael Thornton", pases: 2 },
  K111: { nombre: "Kaye", pases: 1 },
  JC112: { nombre: "Jessie Cazer", pases: 4 },
  D113: { nombre: "Dema", pases: 1 },
  MF114: { nombre: "Miguel Freay", pases: 1 },
  BP115: { nombre: "Brian Philpott", pases: 1 },
  LM116: { nombre: "Luis Mendoza", pases: 1 },
  CV117: { nombre: "Connor Violet", pases: 1 },
  CG118: { nombre: "Chris Graham", pases: 1 },
  TC119: { nombre: "Tracey Carter", pases: 1 },
  L120: { nombre: "Lori", pases: 2 },
  B121: { nombre: "BJ", pases: 1 },
  AB122: { nombre: "Alex Brandon", pases: 1 },
  GB123: { nombre: "Genessis Briceño", pases: 0 },
  LA124: { nombre: "Luis Alvarado", pases: 0 },
};

let nombreInvitado = "";
let codigoInvitado = "";
let pasesAdicionales = 0;

function validarCodigo() {
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  const formCodigo = document.getElementById("form-codigo");
  const pregunta = document.getElementById("pregunta");
  const botones = document.getElementById("botones");
  const mensaje = document.getElementById("mensaje");
  const titulo = document.getElementById("titulo");

  mensaje.innerText = "";

  if (invitados[codigo]) {
    nombreInvitado = invitados[codigo].nombre;
    pasesAdicionales = invitados[codigo].pases;
    codigoInvitado = codigo;

    formCodigo.classList.add("oculto");
    titulo.classList.add("oculto");
    pregunta.innerText = `Hello ${nombreInvitado}, will you attend the wedding?`;
    pregunta.classList.remove("oculto");
    botones.classList.remove("oculto");
  } else {
    mensaje.innerText = "The code you entered is not valid. Please check your invitation.";
    mensaje.classList.add("fade-in");
  }
}

function responder(asistira) {
  const contenedor = document.querySelector(".container");
  let mensajeFinal = "";

  if (asistira === "si") {
    if (pasesAdicionales > 0) {
      const textoPase = pasesAdicionales === 1
        ? "You have a pass for 1 additional guest."
        : `You have a pass for ${pasesAdicionales} additional guests.`;
      mensajeFinal = `${nombreInvitado},  thank you for confirming your attendance. We are excited to see you on our big day! ${textoPase} 💍❤️`;
    } else {
      mensajeFinal = `${nombreInvitado}, thank you for confirming your attendance. We are excited to see you on our big day! 💍❤️`;
    }
  } else {
    mensajeFinal = `${nombreInvitado}, thank you for letting us know. We are sorry you won’t be able to join us, but you will be in our hearts the same 💍❤️`;
  }

  contenedor.innerHTML = `<h1 class="fade-in">${mensajeFinal}</h1>`;
  enviarConfirmacion(nombreInvitado, asistira === "si" ? "✅" : "❌");
}

function enviarConfirmacion(nombre, estado) {
  fetch("/api/confirmacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, estado }),
  });
}
