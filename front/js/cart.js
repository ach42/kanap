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
      let productDivImg = document.createElement("div");
      productDivImg.className = "cart__item__img";
      productArticle.appendChild(productDivImg)
      let productImg = document.createElement("img");
      productImg.src = couches.imageUrl;
      productDivImg.appendChild(productImg)
    }
}