import cart from "./cart.js";
import products from "./products.js";
i;

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

// LOAD TEMPLATE FILE
const loadTemplate = () => {
  fetch("/template.html")
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      let contentTab = document.getElementById("contentTab");
      contentTab.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = null;
      cart();
      initApp();
    });
};

loadTemplate();

const initApp = () => {
  let idProduct = new URLSearchParams(window.location.search).get("id");
  let fact = products.filter((value) => value.id == idProduct)[0];

  let detail = document.querySelector(".detail");
  detail.querySelector(".image img").src = fact.image;
  detail.querySelector(".name").innerHTML = fact.name;
  detail.querySelector(".price").innerHTML = `$${fact.Price}`;
  detail.querySelector(".description").innerHTML = fact.Description;
  detail.querySelector(".addCart").dataset.id = idProduct;

  // SIMILAR PRODUCTS
  let listProduct = document.querySelector(".listProduct");
  listProduct.innerHTML = null;
  products
    .filter((value) => value.id != idProduct)
    .forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.innerHTML = `
      <a href="/detail.html?id=${product.id}">
        <img src="${product.image}" />
      </a>
      <h2>${product.name}</h2>
      <div class="price">$${product.Price}</div>
      <button class="addCart" data-id="${product.id}">
        Add To Cart
      </button>
    `;
      listProduct.appendChild(newProduct);
    });
};
