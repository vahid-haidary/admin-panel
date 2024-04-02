let main = document.querySelector("main")
let addProduct = document.querySelector("#add-btn");
let modal = document.querySelector(".modal-container");
let noItem = document.querySelector(".no-item");
let closeBtn = document.querySelector("#close-btn");
let submit = document.querySelector("#submit-btn");
let modalImg = document.querySelector("#modal-img")
let imageProduct = document.querySelector(".image-product")
let cartContainer = document.querySelector(".cart-container")
let cart = document.querySelector(".cart")
let slider = document.querySelector(".slider-btn")
let leftSlider = document.querySelector("#left-slider-btn")
let rightSlider = document.querySelector("#right-slider-btn")
let swiper = document.querySelector(".swiper")
let search = document.querySelector(".search-input")
let filter = document.querySelector("#filter")
let editor = document.querySelector(".editTor")
let chooseFile = document.querySelector("#label-browser")

//Modal Inputs
let fileBro = document.querySelector("#file-browser")
let pName = document.querySelector("#p-name")
let pDec = document.querySelector("#p-dec")
let pCon = document.querySelector("#p-con")


//Add PRoduct Btn
addProduct.addEventListener("click", function() {
    modal.style.display = "block";
    pName.value = ""
    pDec.value = ""
    pCon.value = ""
    pName.focus()


});

//Choose File Btn

fileBro.addEventListener("change", function() {
    const file = fileBro.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        modalImg.src = e.target.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }

});

//Close Modal Btn

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});


//Structure Of Cart

let savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
savedItems.forEach(item => {
    // Rebuild the cart items using the saved data
    let parentItem = document.createElement("div");
    parentItem.classList.add("cart-container")

    //top-cart
    let cartTop = document.createElement("div")
    cartTop.classList.add("cart-top-container")

    let imageContainer = document.createElement("div")
    imageContainer.classList.add("image-container")
    let image = document.createElement("img");
    image.classList.add("image-product")
    image.src = item.productImageSrc; 
    image.alt = "No Picture";
    imageContainer.appendChild(image);

    let countContainer = document.createElement("div")
    countContainer.classList.add("count-container")

    let h4elem = document.createElement("h4")
    h4elem.innerHTML = "Stock:"

    let spanElem = document.createElement("span")
    spanElem.innerHTML = item.productCount


    let imageCount = document.createElement("img");
    imageCount.src = "images/ready-stock.png"; 
    imageCount.alt = "Stock Pic";

    countContainer.append(h4elem,spanElem,imageCount)

    //description cart
    let descripCart = document.createElement("div")
    descripCart.classList.add("descrip-title")

    let h3elem = document.createElement("h3")
    h3elem.innerHTML = item.productName
 
        
    descripCart.append(h3elem)

    //bottom-cart
    let bottomCart = document.createElement("div")
    bottomCart.classList.add("bottom-cart")

    let descContent = document.createElement("div")
    descContent.classList.add("description-content")
        
    let pElem = document.createElement("p")
    pElem.innerHTML = item.productDesc

    descContent.appendChild(pElem)

        //btns
    let btns = document.createElement("div")
    btns.classList.add("twice-btn")
        
    let spanDelete = document.createElement("span")
    spanDelete.classList.add("del")
    spanDelete.innerHTML = "Delete"
        

    let spanEdit = document.createElement("span")
    spanEdit.classList.add("edit")
    spanEdit.innerHTML = "Edit"


    btns.append(spanEdit,spanDelete)

    //appends
    bottomCart.append(descContent,btns)
    cartTop.append(imageContainer,countContainer)
    parentItem.append(cartTop,descripCart,bottomCart)
    swiper.appendChild(parentItem);
    cart.appendChild(swiper)

    
});

    //Search 
    let cartItems = document.querySelectorAll(".cart-container");
    search.addEventListener("input", function(event) {
        let searchValue = event.target.value.toLowerCase();
        let itemDisplayed = false;
    
        if (searchValue === '') {
            cartItems.forEach(function(product) {
                product.style.display = "block";
                slider.style.display = "flex"
            })
            noItem.style.display = "none";
            return; 
        }
    
        cartItems.forEach(function(product) {
            let productName = product.querySelector(".descrip-title h3").innerHTML.toLowerCase();
            if (productName.includes(searchValue)) {
                product.style.display = "block";
                itemDisplayed = true;
            } else {
                product.style.display = "none";

            }
        });
    
        if (!itemDisplayed) {
            noItem.style.display = "flex"; //search not found  //false want
            slider.style.display = 'none'
        } else {
            noItem.style.display = "none";  //search found   true want
            slider.style.display = 'flex'

        }
    });

    //Delete Btn
let deleteBtn = document.querySelectorAll(".del");
deleteBtn.forEach((btn,index) => {
    btn.addEventListener("click",function(){
        savedItems.splice(index,1)
        localStorage.setItem('cartItems', JSON.stringify(savedItems));
        this.closest(".cart-container").remove()
        if(swiper.children.length > 0) {
            noItem.classList.add("hide");
        } else {
            noItem.classList.remove("hide");
        }
                
        if(swiper.children.length < 3){
            if(slider){
            slider.style.display = "none"
            }
            }
            location.reload()
    })
})

if (savedItems.length > 0) {
    noItem.classList.add("hide");
}

    //Slider
    if(swiper.children.length > 2){

        slider.style.display = "flex"
        
        let cartItems = document.querySelectorAll(".cart-container");
        let currentIndex = 0;

        //Right 
        rightSlider.addEventListener("click", function() {
            currentIndex++;
            if (currentIndex >= cartItems.length - 2) {
                currentIndex = cartItems.length - 2;
            }
            swiper.style.transform = `translateX(-${currentIndex * 48}%)`;
        });

        //Left
        leftSlider.addEventListener("click", function() {

            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = 0;
            }
            swiper.style.transform = `translateX(-${currentIndex * 48}%)`;
        });
    }


        //Edit Btn
        let editBtn = document.querySelectorAll(".edit");
        editBtn.forEach((eBtn) => {
            eBtn.addEventListener("click", function() {
                // Show the modal for editing
                editor.style.display = "block"
                submit.style.display = "none"
                modal.style.display = "flex"
                chooseFile.innerHTML = "Dont Choose Again"
                chooseFile.style.backgroundColor = "#c9c9c9bb"
        
                // Find the parent item of the clicked edit button
                let parentItem = eBtn.closest(".cart-container");
        
                // Get the product details from the UI
                let productNameElement = parentItem.querySelector(".descrip-title h3");
                let productDescElement = parentItem.querySelector(".description-content p");
                let productCountElement = parentItem.querySelector(".count-container span");
        
                // Get the current values
                let productName = productNameElement.innerHTML;
                let productDescription = productDescElement.innerHTML;
                let productCount = productCountElement.innerHTML;
        
                // Set input values in modal to current values
                pName.value = productName;
                pDec.value = productDescription;
                pCon.value = productCount;
                
        
               // Update UI with new values when user clicks save changes button in modal
               editor.addEventListener("click", function() {
                    
                    productNameElement.innerHTML= pName.value;
                    productDescElement.innerHTML= pDec.value;
                    productCountElement.innerHTML= pCon.value;
        
                    savedItems.forEach(item => {
                        if (item.productName === productName) {
                            item.productName = pName.value;
                            item.productDesc = pDec.value;
                            item.productCount = pCon.value;
                        }
                        return item;
                    });
        
                    localStorage.setItem('cartItems', JSON.stringify(savedItems));
                    modal.style.display = "none"
               });
            });
        });

        
        //Filter Btn
    filter.addEventListener("change", function(event) {
        let cartItems = document.querySelectorAll(".cart-container");
        let noItemShow = false

        //No Filter
        if(event.target.value === "0"){
            cartItems.forEach(function(item){
                item.style.display = "flex"
            })
            slider.style.display = 'flex'
            noItem.style.display = "none"
        }else{

            //Filter > 5
        if (event.target.value === "1") {
            cartItems.forEach(function(item) {
                let productCount = parseInt(item.querySelector(".count-container span").innerHTML);
                if (productCount > 5) {
                item.style.display = "flex";
                noItemShow = true
                } else {
                item.style.display = "none";
                }
            });
            } 

            //Filter < 5
            else if(event.target.value === "2") {
            cartItems.forEach(function(item) {
                let productCount = parseInt(item.querySelector(".count-container span").innerHTML);
                if(productCount < 5){
                    item.style.display = "flex";
                    noItemShow = true
                }else {
                    item.style.display = "none";
                }
            });
            }else{
                cartItems.forEach(function(item){
                    item.style.display = "flex"
                })
            }
            if (!noItemShow) {
                noItem.style.display = "flex"; //filter not found  
                slider.style.display = 'none'
            } else {
                noItem.style.display = "none";  //filter found   
                slider.style.display = 'flex'

            }
    }

    });
        

//Submit Btn In Modal
submit.addEventListener("click", function() {
    
    let productName = pName.value
    let productDesc = pDec.value
    let productCount = pCon.value

    if (productName === "" || productDesc === "" || productCount === "") {
        alert("Please fill out the form completely ")
        modal.style.display= "flex" 

      }else{
        modal.style.display= "none" 
        //parent
        let parentItem = document.createElement("div")
        parentItem.classList.add("cart-container")
        
        //top-cart
        let cartTop = document.createElement("div")
        cartTop.classList.add("cart-top-container")

        let imageContainer = document.createElement("div")
        imageContainer.classList.add("image-container")
        let image = document.createElement("img");
        image.classList.add("image-product")
        image.src = modalImg.src; 
        image.alt = "No Picture";
        imageContainer.appendChild(image);

        let countContainer = document.createElement("div")
        countContainer.classList.add("count-container")

        let h4elem = document.createElement("h4")
        h4elem.innerHTML = "Stock:"

        let spanElem = document.createElement("span")
        spanElem.innerHTML = productCount


        let imageCount = document.createElement("img");
        imageCount.src = "images/ready-stock.png"; 
        imageCount.alt = "";

        countContainer.append(h4elem,spanElem,imageCount)

        //description cart
        let descripCart = document.createElement("div")
        descripCart.classList.add("descrip-title")

        let h3elem = document.createElement("h3")
        h3elem.innerHTML = productName
 
        
        descripCart.append(h3elem)

        //bottom-cart
        let bottomCart = document.createElement("div")
        bottomCart.classList.add("bottom-cart")

        let descContent = document.createElement("div")
        descContent.classList.add("description-content")
        
        let pElem = document.createElement("p")
        pElem.innerHTML = productDesc

        descContent.appendChild(pElem)

        //btns
        let btns = document.createElement("div")
        btns.classList.add("twice-btn")
        
        let spanDelete = document.createElement("span")
        spanDelete.classList.add("del")
        spanDelete.innerHTML = "Delete"
  

        let spanEdit = document.createElement("span")
        spanEdit.classList.add("edit")
        spanEdit.innerHTML = "Edit"


        btns.append(spanEdit,spanDelete)

        //appends
        bottomCart.append(descContent,btns)
        cartTop.append(imageContainer,countContainer)
        parentItem.append(cartTop,descripCart,bottomCart)
        swiper.appendChild(parentItem)
        cart.appendChild(swiper)

        //No item

        if (cart.children.length > 0) {
            noItem.classList.add("hide");
        } else {
            noItem.classList.remove("hide");
        }
        
        //Local Storage 
    let cartItems = document.querySelectorAll(".cart-container");
    
    const itemsData = Array.from(cartItems).map(item => {
    const productName = item.querySelector(".descrip-title h3").innerHTML;
    const productDesc = item.querySelector(".description-content p").innerHTML;
    const productCount = item.querySelector(".count-container span").innerHTML;
    const productImageSrc = item.querySelector(".image-product").src;

    return {
        productName,
        productDesc,
        productCount,
        productImageSrc
    };
});


localStorage.setItem('cartItems', JSON.stringify(itemsData));

    modalImg.src = ""
    location.reload()
}
    });   

   // Function of reload Windows
    window.addEventListener("load",function(){
        search.value = ""
        filter.value = 0

    })