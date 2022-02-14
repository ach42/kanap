Promise.all([
    fetch('http://localhost:3000/api/products/'),
    JSON.parse(localStorage.getItem("product"))
  ]).then(async([getCouches, getCart]) => {
    const couches = await getCouches.json();
    const cart = getCart;
    return [couches,cart]
  })
  .then((response) => {
    console.log(response);

  })
