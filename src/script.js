let addProduct = document.querySelector("#add-btn");
let modal = document.querySelector(".modal-container");
let noItem = document.querySelector(".no-item");
let closeBtn = document.querySelector("#close-btn");
let submit = document.querySelector("#submit-btn");
let deleteBtn = document.querySelector("#del");
let cart = document.querySelector(".cart-container")

addProduct.addEventListener("click", function() {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

submit.addEventListener("click", function() {
    noItem.style.display = "none";
    modal.style.display = "none";
    cart.style.display = "flex";
});

deleteBtn.addEventListener("click", function(){
    cart.remove()
    cart.style.display = "none"
    noItem.style.display = "flex";

})
