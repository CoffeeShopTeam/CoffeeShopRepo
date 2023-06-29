console.log("testtttttt");
let cartItems = $("#cart-items");
let cartContent = $("#cart-items");
let cartTotal = $("#cart-total");
let jsonProducts = [
  {
    image: "/assets/ShlomkePic.png",
    title: "Fictional Product 1",
    price: 19.99,
    description: "1st test product",
    quantity: 1,
  },
  {
    image: "/assets/ShlomkePic.png",
    title: "Fictional Product 2",
    price: 10.0,
    description: "2nd test product",
    quantity: 2,
  },
];

localStorage.setItem("jsonProducts", JSON.stringify(jsonProducts));
let cart = [];

$(document).ready(function () {
  cart = getProducts();
  populateCart(cart);
  setCartValues(cart);
});

function cartLogic() {
  $(".clear-cart").click(function () {
    clearCart();
  });

  cartContent.on("click", ".remove-item", function () {
    let removeItem = $(this);
    let id = parseInt(removeItem.data("id"));
    removeItem.closest(".cart-items").remove();
    removeItem(id);
  });

  cartContent.on("click", ".plus-button", function () {
    let addQuantity = $(this);
    let id = parseInt(addQuantity.data("id"));
    let tempItem = cart.find(function (item) {
      return item.id === id;
    });
    tempItem.quantity += 1;
    setCartValues(cart);
    addQuantity.next().text(tempItem.quantity);
  });

  cartContent.on("click", ".minus-button", function () {
    let lowerQuantity = $(this);
    let id = parseInt(lowerQuantity.data("id"));
    let tempItem = cart.find(function (item) {
      return item.id === id;
    });
    tempItem.quantity -= 1;
    if (tempItem.quantity > 0) {
      setCartValues(cart);
      lowerQuantity.prev().text(tempItem.quantity);
    } else {
      lowerQuantity.closest(".cart-items").remove();
      removeItem(id);
    }
  });
}

function getProducts() {
  let cart = JSON.parse(localStorage.getItem("jsonProducts"));
  if (cart) {
    console.log(cart);
  } else {
    console.log("No JSON products found in local storage");
  }
  return cart;
}

function populateCart(cart) {
  cart.forEach(function (item) {
    addCartline(item);
  });
}

function addCartline(cartItem) {
  console.log(cartItem);
  let cartItemsDiv = $("#cart-items");
  const newItem = $("<div>");
  newItem.html(`
  <div class="product-container row">
  <div class="product-item">
    <div class="product-image">
      <img id="product-image" src="${cartItem.image}" alt="Product Image">
    </div>
    <div class="product-details">
      <h4 id="product-title">${cartItem.title}</h4>
      <h5 id="product-price">$${cartItem.price}</h5>
      <btn class="remove-item" data-id="${cartItem.id}">remove</btn>
    </div>
      <div class="product-quantity">
      <button class="minus-button">-</button>
      <p class="item-amount">${cartItem.quantity}</p>
      <button class="plus-button">+</button>
    </div>
  </div>
</div>
  <hr class="mb-3">
  `);
  cartItemsDiv.append(newItem);
  setCartValues(cart);
}

function removeItem(id) {
  cart = cart.filter(function (item) {
    return item.id !== id;
  });
  setCartValues(cart);
}

function setCartValues(cart) {
  let countTotal = 0;
  let itemsTotal = 0;
  let cartItems = $("#cart-total");
  cart.forEach(function (item) {
    countTotal += item.price * item.quantity;
    itemsTotal += item.quantity;
  });
  cartItems.text(itemsTotal);

  let cartTotal = $("#cart-total");
  cartTotal.html(`<div class="cart-total">$${countTotal.toFixed(2)}</div>`);
}

function clearCart() {
  cart = [];
  setCartValues(cart);
  cartContent.empty();
}

cartLogic();
