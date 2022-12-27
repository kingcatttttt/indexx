

//63a90a13f43a573dae095739
let productsGrid = document.getElementById("products-grid");
let productsArray = [];
let url = "https://market-a15d.restdb.io/rest/products?max=3"
let xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "63a90a13f43a573dae095739");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.responseType = "json";
xhr.send();

xhr.onload = function() {
    let products = xhr.response;
    productsArray = products
    productsGrid.innerHTML = null;

    for (const product of products) {
        let productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h2 class="product-name">${product.name}</h2>
            <img src="${product.photo_url}" class="product-img">
            <p class="product-desc">${product.description}</p>
            <p class="product-price">Price: ${product.price}UAH</p>
            <button onclick="addProductToCard(${product.id})">Buy</button>
        `;
        productsGrid.append(productElement);
    }
}

let cartProd = document.getElementById("cart-products");
function openCart() {
    cartProd.classList.toggle("hide");
}

let cart = [];

function showCartProducts() {
    if (cart.length == 0) return cartProd.innerHTML = "Cart is empty";
    cartProd.innerHTML = null;
    let sum = 0;
    for (const product of cart) {
        cartProd.innerHTML += `
            <p>
                <img src="${product.photo_url}">
                ${product.name} |${product.price}UAH
                <hr>
            </p>
        `;
        sum += product.price;
    }

    cartProd.innerHTML += `
        <p>Total price: <b>${sum}UAH</b></p>
        <button onclick="buyAll()">Buy all</button>
    `
}

function buyAll() {
    cart = [];
    localStorage.setItem("cart", "[]");
    cartProd.innerHTML = "Money was withdrawn from your card";
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    showCartProducts();
}

function addProductToCard(id) {
    let product = productsArray.find(function(p){
        return p.id == id;
    });
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartProducts();
    let btn = document.getElementById("cart-button");
    btn.classList.add("active");
    setTimeout(function () {
        btn.classList.remove("active");
    }, 500)
}