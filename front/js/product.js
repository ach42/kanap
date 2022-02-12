let id = window.location.href;
let url = new URL(id);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

fetch("http://localhost:3000/api/products/" + idProduct)
    .then(response => response.json())
    .then(couch => { 
        displayProduct(couch);
        addProduct(couch);
    })

function displayProduct(article){
        // Nom
        let titleElt = document.getElementById('title'); 
        titleElt.textContent = article.name;
        // Prix
        let priceElt = document.getElementById('price');
        priceElt.textContent = article.price;
        // Descriptions
        let descriptionElt = document.getElementById('description');
        descriptionElt.textContent = article.description;
        // image
        let imageElt = document.createElement("img");
        document.querySelector(".item__img").appendChild(imageElt);
        imageElt.src = article.imageUrl;
        imageElt.alt = article.altTxt;
        // titre de la page
        document.title = article.name;
        // selection couleurs
        const colorsElt = document.getElementById("colors")
        for (let color of article.colors){
          let colorCouch = document.createElement("option");
          colorCouch.value = color;
          colorCouch.textContent = color;
          colorsElt.appendChild(colorCouch);
        }
}


const quantityElt = document.getElementById('quantity');
const colorElt = document.getElementById('colors');
const confirmElt = document.getElementsByClassName('item__content');
const confirmText = document.createElement('div');
confirmElt[0].appendChild(confirmText);

function addProduct(article) {
    const btn = document.querySelector("#addToCart");
    btn.addEventListener("click", () => {
        // Empêcher l'envoie à 0
        const quantity = parseInt(quantityElt.value)
        if (quantity > 0 && quantity <=100){
            const product = {
                id: article._id,
                color : colorElt.value,
                quantity : quantity,
            }      
            // Local Storage
            let cart = JSON.parse(localStorage.getItem("product")) || [];
            // Find id + color
            const localStorageFind = cart.find((el) => el.id === article._id && el.color === colorElt.value);
            // Quantité addition local storage + input DOM
            if (localStorageFind) {
                localStorageFind.quantity += product.quantity;    
            } else {
                cart.push(product);
            }
            localStorage.setItem("product", JSON.stringify(cart));
            confirmText.innerHTML = `<p style="text-align:center;">${quantity} ${article.name} ${colorElt.value} ajouté au panier !<br><a href="cart.html" style="color: white;">Procéder au paiment</a></p>`;
        }
    });
}