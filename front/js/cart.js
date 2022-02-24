const cart = JSON.parse(localStorage.getItem("product"));
for (let cartElt of cart) {

    fetch("http://localhost:3000/api/products/" + cartElt.id).then(response => response.json())
    .then(couches => {
      cart(couches)
    })

    // intégration
    function cart(couches){
      // création <article>
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute('data-id', cartElt.id);
      productArticle.setAttribute('data-color', cartElt.color);
      // création div cart__item__img
      let productDivImg = document.createElement("div");
      productDivImg.className = "cart__item__img";
      productArticle.appendChild(productDivImg);
      // image produit
      let productImg = document.createElement("img");
      productImg.src = couches.imageUrl;
      productImg.alt = couches.name;
      productDivImg.appendChild(productImg);
      // création div cart__item__content
      let productDivContent = document.createElement("div");
      productDivContent.className = "cart__item__content";
      productArticle.appendChild(productDivContent);
      // création div cart__item__content__description
      let productDivContentDesc = document.createElement("div");
      productDivContentDesc.className = "cart__item__content__description";
      productDivContent.appendChild(productDivContentDesc);
      // produit content
      let productTitleContent = document.createElement("h2");
      productTitleContent.textContent = couches.name;
      productDivContentDesc.appendChild(productTitleContent);
      let productColor = document.createElement("p");
      productColor.textContent = cartElt.color;
      productDivContentDesc.appendChild(productColor);
      let productPrice = document.createElement("p");
      productPrice.textContent = couches.price + "€";
      productDivContentDesc.appendChild(productPrice);
      // création cart__item__content__settings
      let settingsDivItemContent = document.createElement("div");
      settingsDivItemContent.className = "cart__item__content__settings";
      productDivContent.appendChild(settingsDivItemContent);
      // création div cart__item__content__settings__quantity
      let settingsDivItemQuantity = document.createElement("div");
      settingsDivItemQuantity.className = "cart__item__content__settings__quantity";
      settingsDivItemContent.appendChild(settingsDivItemQuantity)
      // Quantité
      let productQuantity = document.createElement("p");
      productQuantity.textContent = "Qté : " + cartElt.quantity;
      settingsDivItemQuantity.appendChild(productQuantity);
      let productQuantityInput = document.createElement("input");
      productQuantityInput.className = "itemQuantity";
      productQuantityInput.value = cartElt.quantity;
      productQuantityInput.setAttribute("type", "number");
      productQuantityInput.setAttribute("min", "1");
      productQuantityInput.setAttribute("max", "100");
      productQuantityInput.setAttribute("name", "itemQuantity");
      settingsDivItemQuantity.appendChild(productQuantityInput);
      // div suppresion
      let productDivDelete = document.createElement("div");
      productDivDelete.className = "cart__item__content__settings__delete";
      settingsDivItemContent.appendChild(productDivDelete);
      let productTextDelete = document.createElement("p");
      productTextDelete.className = "deleteItem";
      productTextDelete.textContent = "Supprimer";
      productDivDelete.appendChild(productTextDelete);
    }
}

total()

function total() {
const totalQuantityElt = document.getElementById("totalQuantity");
const totalQuantity = JSON.parse(cart.length);
totalQuantityElt.textContent = totalQuantity;
console.log(totalQuantity)
const totalPriceElt = document.getElementById("totalPrice");
const totalPrice = cart.reduce((total, current) => total + current.price, 0)
console.log(totalPrice)
totalPriceElt.textContent = totalPrice;
}