let cartItems = $("#cart-items");
let cartContent = $(".cart-content");
let cartTotal = $("#cart-total");
let cart = [];

$(document).ready(function () {
  cart = getProducts();
  if (cart === null) {
    showEmptyCartMessage();
  }
  populateCart(cart);
  setCartValues(cart);

  function removeItemFromCart(id) {
    cart = cart.filter(function (item) {
      return item.id !== id;
    });

    if (cart.length === 0) {
      clearCart(cart);
      showEmptyCartMessage();
      return;
    }

    setCartValues(cart);
    updateLocalStorage(cart);
    populateCart(cart);
    hideEmptyCartMessage();
  }

  function populateCart(cart) {
    $(".product-container").remove();
    if (cart === null) {
      return;
    }
    cart.forEach(function (item) {
      addCartline(item);
    });

    $(".cart-content")
      .off("click", ".remove-item")
      .on("click", ".remove-item", function () {
        let id = $(this).attr("data-id");
        $(this).closest(".cart-items").remove();
        removeItemFromCart(id);
      });

    $(".cart-content")
      .off("click", ".plus-button")
      .on("click", ".plus-button", function () {
        let id = $(this).attr("data-id");
        let tempItem = cart.find(function (item) {
          return item.id === id;
        });
        tempItem.quantity = Number(tempItem.quantity) + 1;
        $(this).siblings(".counter-value").text(tempItem.quantity);
        setCartValues(cart);
        updateLocalStorage(cart);
      });

    $(".cart-content")
      .off("click", ".minus-button")
      .on("click", ".minus-button", function () {
        let id = $(this).attr("data-id");
        let tempItem = cart.find(function (item) {
          return item.id === id;
        });
        if (tempItem.quantity > 1) {
          tempItem.quantity = Number(tempItem.quantity) - 1;
          $(this).siblings(".counter-value").text(tempItem.quantity);
        }
        setCartValues(cart);
        updateLocalStorage(cart);
      });

    $(".clear-cart")
      .off("click")
      .click(function () {
        clearCart();
      });
  }

  function getProducts() {
    let cart = JSON.parse(localStorage.getItem("jsonProducts"));
    return cart;
  }

  function addCartline(cartItem) {
    let cartItemsDiv = $("#cart-items");
    const newItem = $("<div>");
    newItem.html(`
      <div class="product-container row">
     
        <div class="product-item">
        <div class="product-image">
        <img id="product-image" src="${cartItem.image}" alt="Product Image" onclick="window.location.href = '/productPage/${cartItem.id}'">
        </div>
          <div class="product-details">
            <h4 id="product-title">${cartItem.title}</h4>
            <h5 id="product-price">₪ ${cartItem.price}</h5>
          </div>
          <div class="counter-button">
                      <span class="counter-value">${cartItem.quantity}</span>
                    </div>
                      <div class="remove-item-container">
                      <button
                      data-id="${cartItem.id}"
                        class="remove-item"
                      >
                        Remove
                      </button>
                    </div>
        </div>
      </div>
    `);
    cartItemsDiv.append(newItem);
    setCartValues(cart);
  }

  function setCartValues(cart) {
    let countTotal = 0;
    if (cart === null) {
      countTotal = 0.0;
      let cartTotalContainer = $("#cart-total");
      cartTotalContainer.html(`<div class="cart-total">₪ ${countTotal}</div>`);
      $("#gotoCheckout").attr("disabled", true)
    } else {
      cart.forEach(function (item) {
        countTotal += item.price * item.quantity;
      });
      let cartTotalContainer = $("#cart-total");
      cartTotalContainer.html(
        `<div id="cart-total">₪ ${countTotal.toFixed(2)}</div>`
      );
    }
  }

  function updateLocalStorage(cart) {
    localStorage.setItem("jsonProducts", JSON.stringify(cart));
  }

  function clearCart() {
    cart = [];
    $(".product-container").remove();
    setCartValues(cart);
    updateLocalStorage(cart);
    localStorage.removeItem("jsonProducts");
    showEmptyCartMessage();
  }
});

function showEmptyCartMessage() {
  let emptyMessage = document.getElementById("empty-message");
  emptyMessage.style.display = "block";
}

function hideEmptyCartMessage() {
  let emptyMessage = document.getElementById("empty-message");
  emptyMessage.style.display = "none";
}

$(document).ready(function () {
  $(".remove-item").hover(
    function () {
      $(this).css("background-color", "black");
      $(this).css("color", "white");
    },
    function () {
      $(this).css("background-color", "");
      $(this).css("color", "");
    }
  );
  $(".clear-cart").hover(
    function () {
      $(this).css("background-color", "black");
      $(this).css("color", "white");
    },
    function () {
      $(this).css("background-color", "");
      $(this).css("color", "");
    }
  );
  $(".to-checkout").hover(
    function () {
      $(this).css("background-color", "white");
      $(this).css("color", "black");
    },
    function () {
      $(this).css("background-color", "");
      $(this).css("color", "");
    }
  );
});
