let cartItems = $("#cart-items");
let cartContent = $(".cart-content");
let cartTotal = $("#cart-total");
let jsonProducts = [
  {
    id: 1, // Add an id property
    image: "/assets/ShlomkePic.png",
    title: "Fictional Product 1",
    price: 19.99,
    quantity: 1,
  },
  {
    id: 2, // Add an id property
    image: "/assets/ShlomkePic.png",
    title: "Fictional Product 2",
    price: 10.0,
    quantity: 2,
  },
];

localStorage.setItem("jsonProducts", JSON.stringify(jsonProducts));
let cart = [];

$(document).ready(function () {
  cart = getProducts();
  populateCart(cart);
  setCartValues(cart);

  function removeItemFromCart(id) {
    cart = cart.filter(function (item) {
      return item.id !== id;
    });
    setCartValues(cart); // Update cart values after removing item
  }

  function populateCart(cart) {
    cartItems.empty();
    cart.forEach(function (item) {
      addCartline(item);
    });

    $(".remove-item").click(function () {
      let removeItem = $(this);
      let id = parseInt(removeItem.data("id"));
      removeItem.closest(".product-container").remove();
      removeItemFromCart(id);
    });

    $(".plus-button").click(function () {
      let addQuantity = $(this);
      let id = parseInt(addQuantity.data("id"));
      let tempItem = cart.find(function (item) {
        return item.id === id;
      });
      tempItem.quantity += 1;
      addQuantity.siblings(".item-amount").text(tempItem.quantity);
      setCartValues(cart);
    });

    $(".minus-button").click(function () {
      let lowerQuantity = $(this);
      let id = parseInt(lowerQuantity.data("id"));
      let tempItem = cart.find(function (item) {
        return item.id === id;
      });
      if (tempItem.quantity > 1) {
        tempItem.quantity -= 1;
        lowerQuantity.siblings(".item-amount").text(tempItem.quantity);
      }
      setCartValues(cart);
    });

    $(".clear-cart").click(function () {
      clearCart();
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
          <button class="remove-item" data-id="${cartItem.id}">remove</button>
        </div>
        <div class="product-quantity">
          <button class="minus-button" data-id="${cartItem.id}">-</button>
          <p class="item-amount">${cartItem.quantity}</p>
          <button class="plus-button" data-id="${cartItem.id}">+</button>
        </div>
      </div>
    </div>
    <hr class="mb-3">
  `);
    cartItemsDiv.append(newItem);
    setCartValues(cart);
  }

  function setCartValues(cart) {
    let countTotal = 0;
    let itemsTotal = 0;
    cart.forEach(function (item) {
      countTotal += item.price * item.quantity;
      itemsTotal += item.quantity;
    });
    cartTotal.text(itemsTotal.toFixed(2));

    let cartTotalContainer = $("#cart-total");
    cartTotalContainer.html(
      `<div class="cart-total">$${countTotal.toFixed(2)}</div>`
    );
  }

  function clearCart() {
    cart = [];
    $(".product-container").remove();
    setCartValues(cart);
  }
});
