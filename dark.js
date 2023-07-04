
const body = document.querySelector("body");
const darkMode = localStorage.getItem("darkMode");

function darkmode() {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false"); // Armazena o estado do modo como falso
    } else {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true"); // Armazena o estado do modo como verdadeiro
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (darkMode === "true") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
});

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

function toggleTextArea() {
    var textareaContainer = document.getElementById("textarea-container");
    var toggleButton = document.querySelector(".toggle-button");

    textareaContainer.classList.toggle("active");
    toggleButton.classList.toggle("active");
}
