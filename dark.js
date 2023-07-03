
const body = document.querySelector("body");
const buttonTheme1 = document.querySelector(".theme-button-1");
const imgTheme1 = document.querySelector(".theme-img-1");
const buttonTheme2 = document.querySelector(".theme-button-2");
const imgTheme2 = document.querySelector(".theme-img-2");
const darkMode = localStorage.getItem("darkMode"); // Obtém o valor armazenado

function darkmode() {
    const body = document.querySelector("body");
    const imgTheme1 = document.querySelector(".theme-img-1");
    const imgTheme2 = document.querySelector(".theme-img-2");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        imgTheme1.setAttribute("src", "./assets/imgs/sun.png");
        imgTheme2.setAttribute("src", "./assets/imgs/sun.png");
        localStorage.setItem("darkMode", "false"); // Armazena o estado do modo como falso
    } else {
        body.classList.add("dark-mode");
        imgTheme1.setAttribute("src", "./assets/imgs/moon.png");
        imgTheme2.setAttribute("src", "./assets/imgs/moon.png");
        localStorage.setItem("darkMode", "true"); // Armazena o estado do modo como verdadeiro
    }
}


function includeNavbar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("navbar").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "navbar.html", true);
    xhttp.send();
}

document.addEventListener("DOMContentLoaded", function () {
    if (darkMode === "true") {
        body.classList.add("dark-mode");
        imgTheme1.setAttribute("src", "./assets/imgs/moon.png");
        imgTheme2.setAttribute("src", "./assets/imgs/moon.png");
    } else {
        body.classList.remove("dark-mode");
        imgTheme1.setAttribute("src", "./assets/imgs/sun.png");
        imgTheme2.setAttribute("src", "./assets/imgs/sun.png");
    }
});
