const burgerBotton = document.querySelector(".hamburguer-menu")
const burgerMenuInterface = document.querySelector(".burguer-menu-interface")
const burgerMenuBackButton = document.querySelector(".burguer-menu-back")

burgerBotton.addEventListener("click", (e) => {
    burgerMenuInterface.classList.toggle("display-block")
})

burgerMenuBackButton.addEventListener("click", (e) => {
    burgerMenuInterface.classList.toggle("display-block")
})