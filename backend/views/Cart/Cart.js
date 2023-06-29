console.log("testtttttt");
var cartItems = $("#cart-items");
var cartContent = $("#cart-items");
var cartTotal = $("#cart-total");
var jsonProducts = [
  {
    image: "/assets/ShlomkePic.png",
    title: "Fictional Product 1",
    price: 9.99,
    description: "1st test product",
    quantity: 1,
  },
  {
    image: "/assets/ShlomkePic.png",
    title: "Fictional Product 2",
    price: 15.9,
    description: "2nd test product",
    quantity: 2,
  },
];

localStorage.setItem("jsonProducts", JSON.stringify(jsonProducts));

$(document).ready(function () {
  let cart = getProducts();
  populateCart(cart);
  setCartValues(cart);
});

function cartLogic() {
  $(".clear-cart").click(function () {
    clearCart();
  });

  cartContent.on("click", ".remove-item", function () {
    var removeItem = $(this);
    var id = parseInt(removeItem.data("id"));
    removeItem.closest(".cart-items").remove();
    removeItem(id);
  });

  cartContent.on("click", ".plus-button", function () {
    var addQuantity = $(this);
    var id = parseInt(addQuantity.data("id"));
    var tempItem = cart.find(function (item) {
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
    <div class="row">
      <img class="product-image" src="${cartItem.image}" alt="Product Image">
      <h4>${cartItem.title}</h4>
      <h5>$${cartItem.price}</h5>
      <span class="remove-item" data-id="${cartItem.id}">remove</span>
    </div>
    <div>
      <i class="plus-button" data-id="${cartItem.id}"></i>
      <p class="item-amount">${cartItem.quantity}</p>
      <i class="minus-button" data-id="${cartItem.id}"></i>
    </div>
  `);
  cartItemsDiv.append(newItem);
}

function removeItem(id) {
  cart = cart.filter(function (item) {
    return item.id !== id;
  });
  setCartValues(cart);
}

function setCartValues(cart) {
  var countTotal = 0;
  var itemsTotal = 0;
  cart.forEach(function (item) {
    countTotal += item.price * item.quantity;
    itemsTotal += item.quantity;
  });
  cartItems.text(itemsTotal);
  cartTotal.text(countTotal.toFixed(2));
}

function clearCart() {
  cart = [];
  setCartValues(cart);
  cartContent.empty();
}

cartLogic();
