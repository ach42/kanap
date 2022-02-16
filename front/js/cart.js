const getCart = JSON.parse(localStorage.getItem("product"));
for (let cartElt of getCart) {
    // Récupèration élèment local storage
    let getId = JSON.stringify(cartElt.id);
    let getColor = JSON.stringify(cartElt.color)
    console.log(getId, getColor)

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
      productArticle.setAttribute('data-id', getId);
      productArticle.setAttribute('data-color', getColor);
      // création div cart__item__img
      let productDivImg = document.createElement("div");
      productDivImg.className = "cart__item__img";
      document.querySelector("#cart__items").appendChild(productDivImg);
      let productImg = document.createElement("img");
      productImg.src = couches.imageUrl;
    }
}