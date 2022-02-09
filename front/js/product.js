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
        document.querySelector(".item__img").appendChild(imageElt); // append child lie create element et query selector
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


const quantity = document.querySelector("#quantity");
const color = document.querySelector("#colors");

function addProduct(article) {
    const btn = document.querySelector("#addToCart");
    btn.addEventListener("click", () =>{
        const product = {
            name: article.name,
            

        }
    })
}

