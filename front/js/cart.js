
const url = "http://localhost:3000/api/products/"
const promises = []
const cart = JSON.parse(localStorage.getItem("product"));
cart.forEach(product => {
  const promise = fetch(url + product.id).then(res => res.json())
  promises.push(promise)
 });

Promise.all(promises).then(products => {
  products.forEach((product, i) => {
    product.colors = cart[i].color;
    product.quantity = cart[i].quantity;
    displayProduct(product)
    deleteEvents(product)
    modifyQtt(product)
  })
  total(products)
})

function total(products) {
  let totalQuantity = 0;
  let totalPrice = 0;
  for(let kanap of products) {
    totalQuantity += kanap.quantity;
    totalPrice += kanap.price * kanap.quantity;
  }
  const totalQuantityElt = document.getElementById("totalQuantity");
  totalQuantityElt.textContent = totalQuantity;

  const totalPriceElt = document.getElementById("totalPrice");
  totalPriceElt.textContent = totalPrice;
}

function deleteEvents(product) {
  const deleteElts = document.querySelectorAll(".deleteItem");
  deleteElts.forEach(deleteElt => {
    deleteElt.addEventListener("click", e => {
      const filter = cart.filter(prod => prod.id !== product._id);
      localStorage.setItem("product", JSON.stringify(filter))
      location.reload()
    })
  })
}

function modifyQtt() {
  let modifyQttElts = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < modifyQttElts.length; i++){
      modifyQttElts[i].addEventListener("change" , (event) => {
          event.preventDefault();
          let quantityCart = cart[i].quantity;
          let modifyQttEltValue = modifyQttElts[i].valueAsNumber;
          const resultFind = cart.find((el) => el.modifyQttEltValue !== quantityCart);
          resultFind.quantity = modifyQttEltValue;
          cart[i].quantity = resultFind.quantity;
          localStorage.setItem("product", JSON.stringify(cart));
    
          location.reload();
      })
  }
}

function displayProduct(product) {

    const articleElt = document.createElement("article");
    document.querySelector("#cart__items").appendChild(articleElt);
    articleElt.className = "cart__item";

    const divImgElt = document.createElement("div");
    divImgElt.className = "cart__item__img";
    articleElt.appendChild(divImgElt);

    const imgElt = document.createElement("img");
    divImgElt.appendChild(imgElt)

    const divItemContent = document.createElement("div");
    divItemContent.className = "cart__item__content";
    articleElt.appendChild(divItemContent);

    const divItemDescription = document.createElement("div");
    divItemDescription.className = "cart__item__content__description";
    divItemContent.appendChild(divItemDescription);

    const titleItem = document.createElement("h2");
    divItemDescription.appendChild(titleItem);

    const colorItem = document.createElement("p");
    divItemDescription.appendChild(colorItem)

    const priceItem = document.createElement("p");
    divItemDescription.appendChild(priceItem)

    const settingsDiv = document.createElement("div");
    settingsDiv.className = "cart__item__content__settings";
    divItemContent.appendChild(settingsDiv);

    const settingsDivQuantity = document.createElement("div");
    settingsDivQuantity.className = "cart__item__content__settings__quantity";
    settingsDiv.appendChild(settingsDivQuantity)

    const itemQuantity = document.createElement("p");
    settingsDivQuantity.appendChild(itemQuantity);

    const itemQuantityInput = document.createElement("input");
    itemQuantityInput.className = "itemQuantity";
    itemQuantityInput.setAttribute("type", "number");
    itemQuantityInput.setAttribute("min", "1");
    itemQuantityInput.setAttribute("max", "100");
    itemQuantityInput.setAttribute("name", "itemQuantity");
    settingsDivQuantity.appendChild(itemQuantityInput);

    const itemDivDelete = document.createElement("div");
    itemDivDelete.className = "cart__item__content__settings__delete";
    settingsDiv.appendChild(itemDivDelete);

    const productTextDelete = document.createElement("p");
    productTextDelete.className = "deleteItem";
    productTextDelete.textContent = "Supprimer";
    itemDivDelete.appendChild(productTextDelete);

    // Dynamic

    imgElt.src = product.imageUrl;
    imgElt.alt = product.name;

    articleElt.setAttribute('data-id', product._id);
    articleElt.setAttribute('data-color', product.colors);

    titleItem.textContent = product.name;

    colorItem.textContent = product.colors;

    priceItem.textContent = product.price + "€";

    itemQuantity.textContent = "Qté : " + product.quantity;
    itemQuantityInput.value = product.quantity;
}