const getOrder = JSON.parse(localStorage.getItem("product"));

for(let command of getOrder) {
    const orderIdElt = document.querySelector("#orderId");
    orderIdElt.innerText = command.id;
}