import { getProducts, getProduct } from "./firebase.js";

const cart = []

let total = 0;

const finalizar = document.querySelector(".finalizar");

const vaciar = document.querySelector(".vaciar");



const vaciarCart = () => {

    total = 0

    document.querySelector(".visualTotal").textContent = total;

    cart.length = 0;

    document.querySelector(".innerCart").innerHTML = "";

}

const finalizarCart = () => {

    total = 0

    document.querySelector(".visualTotal").textContent = total;

    cart.length = 0;

    document.querySelector(".innerCart").innerHTML = "";

    
    Swal.fire(
      'Compra Finalizada!',
      'volver a la tienda',
      'success'
    )

}

finalizar.addEventListener("click", finalizarCart);

vaciar.addEventListener("click", vaciarCart);

const renderCart = () => {

    const innerCart = document.querySelector(".innerCart");

    innerCart.innerHTML = "";

    cart.forEach(producto => {

        const card = document.createElement("div");

        card.className = "card mb-3";

        card.innerHTML = `
        
        <div class="row g-0">

        <div class="col-md-4">
           <img src=${producto.data().image} class="card-img-top productoImg" alt=${producto.data().name}>
        </div>

       <div class="col-md-8">
         <div class="card-body">
           <h5 class="card-title">${producto.data().name}</h5>
           <p class="card-text">AR$${producto.data().precio}</p>
           <input type="number">
          </div>
        </div>
       </div>
        
        `;

    innerCart.append(card);

    });

    
}

const checkCart = (id) => cart.some(producto => producto.id === id);

const actualizarTotal = (precio) => {

    const visualTotal = document.querySelector(".visualTotal");

    total += precio;

    visualTotal.textContent = total;
}

const addToCart = async (e) => {

    if(checkCart(e.target.id)) {
        return false;
     }
    else {
    const productToCart = await getProduct(e.target.id);

    actualizarTotal(productToCart.data().precio);

    cart.push(productToCart);

    renderCart();

    } 

}

const addEvent = () => {

    const buyBtns = document.querySelectorAll(".buyBtn");

    buyBtns.forEach(btn => btn.addEventListener("click", addToCart));

}


const renderCards = async (productosArr) => {

    const productos = await productosArr;

    const cards = document.querySelector(".cards");

    productos.forEach (producto => {

        const card = document.createElement("div");

        card.className = "card col-4";

        card.innerHTML = `

       <img src=${producto.data().image} class="card-img-top productoImg" alt=${producto.data().name}>

        <div class="card-body">

            <h5 class="card-title">${producto.data().name}</h5>
            <p class="card-text"> AR$${producto.data().precio}</p>
            <a href="#" class="btn btn-dark buyBtn" id=${producto.id}>buy</a>

         </div>

        `;
    cards.append(card);
    })
    addEvent();
}

renderCards(getProducts());









