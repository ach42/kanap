fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(couches => {
        const couchIndex = document.getElementById('items');
        for (let article of couches) {
            couchIndex.innerHTML += `
            <a href="./product.html?id=${article._id}">
            <article>
              <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${article.name}</h3>
              <p class="productDescription">${article.description}</p>
            </article>
          </a>
            `
        }
    })