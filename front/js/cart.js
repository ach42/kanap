const url = "http://localhost:3000/api/products/"
const promises = []
const cart = JSON.parse(localStorage.getItem("product"));
cart.forEach(kanap => {
  const promise = fetch(url + kanap.id).then(res => res.json())
  promises.push(promise)
 });

Promise.all(promises).then(kanaps => {
  kanaps.forEach((kanap, i) => {
    kanap.colors = cart[i].color;
    kanap.quantity = cart[i].quantity;
    displayProduct(kanap)
  })
  total(kanaps)
  changeEvents(kanaps)
  deleteEvents(kanaps)
})

function total(kanaps) {

  let totalQuantity = 0;
  let totalPrice = 0;
  for(let kanap of kanaps) {
    totalQuantity += kanap.quantity;
    totalPrice += kanap.price * kanap.quantity;
  }

  const totalQuantityElt = document.getElementById("totalQuantity");
  totalQuantityElt.textContent = totalQuantity;

  const totalPriceElt = document.getElementById("totalPrice");
  totalPriceElt.textContent = totalPrice;
}

function changeEvents(kanaps) {
  //
}

function deleteEvents(kanaps) {
  const deleteElts = document.querySelectorAll(".deleteItem");
  deleteElts.forEach(deleteElt => {
    deleteElt.addEventListener("click", e => {
      localStorage.removeItem("product"); 
    })
  });
}
function displayProduct(kanap) {

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

    imgElt.src = kanap.imageUrl;
    imgElt.alt = kanap.name;

    articleElt.setAttribute('data-id', kanap._id);
    articleElt.setAttribute('data-color', kanap.colors);

    titleItem.textContent = kanap.name;

    colorItem.textContent = kanap.colors;

    priceItem.textContent = kanap.price + "€";

    itemQuantity.textContent = "Qté : " + kanap.quantity;
    itemQuantityInput.value = kanap.quantity;
}
