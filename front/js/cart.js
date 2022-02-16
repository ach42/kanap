const getCart = JSON.parse(localStorage.getItem("product"));
for (let cartElt of getCart) {
    let getId = cartElt.id;
    console.log(getId)
    let getFetch = fetch("http://localhost:3000/api/products/" + getId).then(response => response.json()).then(couch =>{cart(couch)})
    function cart(product){
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.textContent = product.name;
    }
    
}