const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};


function botonIniciarSesion() {
  let iniciarSesion = document.querySelector("button.login-btn");
  let divEscondido = document.querySelector("#loader");

  iniciarSesion.addEventListener("click", function () {
    const exitoValidacion = validacionDatos();

    if (exitoValidacion) {
      divEscondido.classList.remove("hidden");
      divEscondido.style = "color: purple";
      setTimeout(function () {
        divEscondido.classList.add("hidden");
        handleDataAlmacenada();
      }, 3000);
    }
  });
}

let nombreUsuario = "";

function validacionDatos() {
  const form = document.querySelector("form");
  const loginBtn = document.querySelector(".login-btn");

  const emailInput = document.querySelector("#email-input");
  const email = emailInput.value;
  const passwordInput = document.querySelector("#password-input");
  const password = passwordInput.value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const esValido = emailRegex.test(email);
  const esValidoPassword = password.length >= 5;
  let usuarioRegistrado = false;

  baseDeDatos.usuarios.forEach(function (element) {
    if (email == element.email && password == element.password) {
      usuarioRegistrado = true;
      nombreUsuario = element.name.toUpperCase();
    }
  });

  const errorContainer = document.getElementById("error-container");
  const loader = document.getElementById("loader");

  if (!esValido || !esValidoPassword || !usuarioRegistrado) {
    errorContainer.classList.remove("hidden");
    errorContainer.textContent =
      "Alguno de los datos ingresados son incorrectos";
    loader.classList.add("hidden");
    return false;
  } else {
    errorContainer.classList.add("hidden");
    loader.classList.remove("hidden");
    localStorageUsuario();
    return true;
  }
}

function bienvenida(nombre) {
  let main = document.querySelector("main");
  let form = document.querySelector("form");
  let h1 = document.querySelector("h1");
  h1.classList.add("hidden");

  form.classList.add("hidden");
  main.innerHTML = `
  <h2> BIENVENIDO/A ${nombre} AL SITIO 😀</h2>
  <button id="cerrar" class= "login-btn" type="button">Cerrar Sesion</button>
  `
  const botonCerrarSesion= document.querySelector("#cerrar")
  botonCerrarSesion.addEventListener("click", cerrarSesion)
}

function localStorageUsuario() {
  const email = document.querySelector("#email-input").value;
  const password = document.querySelector("#password-input").value;

  let infoAlmacenada = "";

  baseDeDatos.usuarios.forEach(function (element) {
    if (email == element.email && password == element.password) {
      infoAlmacenada = element;
    }
    localStorage.setItem("InformacionUsuario", JSON.stringify(infoAlmacenada));
  });
}

function handleDataAlmacenada() {
  const infoUsuarioJson = JSON.parse(
    localStorage.getItem("InformacionUsuario")
  );

  if (infoUsuarioJson !== null) {
    bienvenida(infoUsuarioJson.name.toUpperCase());
  } else {
    botonIniciarSesion();
  }
}

handleDataAlmacenada();


function cerrarSesion() {
  let main = document.querySelector("main")
  localStorage.clear("InformacionUsuario")
  main.innerHTML = `
  <h2>SE HA CERRADO SESION</h2>
  `
    setTimeout(function(){
      location.reload()
    }, 3000)
  }



