
const body = document.querySelector("body");
const buttonTheme1 = document.querySelector(".theme-button-1");
const imgTheme1 = document.querySelector(".theme-img-1");
const buttonTheme2 = document.querySelector(".theme-button-2");
const imgTheme2 = document.querySelector(".theme-img-2");
buttonTheme1.addEventListener("click", () => {

    if (body.classList.contains("dark-mode")) {
        body.classList.add("y")
        body.classList.remove("dark-mode")
        body.classList.remove("x")
        imgTheme1.setAttribute("src", "./assets/imgs/sun.png")
        imgTheme2.setAttribute("src", "./assets/imgs/sun.png")
    }
    else {
        body.classList.add("dark-mode")
        body.classList.remove("y")
        body.classList.add("x")
        imgTheme1.setAttribute("src", "./assets/imgs/moon.png")
        imgTheme2.setAttribute("src", "./assets/imgs/moon.png")
    }
});
buttonTheme2.addEventListener("click", () => {

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode")
        imgTheme1.setAttribute("src", "./assets/imgs/sun.png")
        imgTheme2.setAttribute("src", "./assets/imgs/sun.png")
    }
    else {
        body.classList.add("dark-mode")
        imgTheme1.setAttribute("src", "./assets/imgs/moon.png")
        imgTheme2.setAttribute("src", "./assets/imgs/moon.png")
    }
});