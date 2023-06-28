$(function () {
  $("#header").load("/backend/views/partials/Header/Header.html");
  $("#footer").load("/backend/views/partials/Footer/Footer.html");
});

$(function () {
  $(".minus-button").click(function () {
    let value = parseInt($(this).siblings(".counter-value").text());
    if (value > 1) {
      value--;
      $(this).siblings(".counter-value").text(value);
    }
  });
  $(".plus-button").click(function () {
    let value = parseInt($(this).siblings(".counter-value").text());
    value++;
    $(this).siblings(".counter-value").text(value);
  });
});

const cartItems = document.getElementById("cart-items");
const cartContent = document.getElementById("cart-content");
const cartTotal = document.getElementById("cart-total");
let cart = [];

/////////////////////////////////////

class Products {
  getProducts() {
    console.log(jsonProducts);
    let products = jsonProducts.items;
    products = products.map((item) => {
      const { title, price } = item.fields;
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      return { title, price, id, image };
    });
    return products;
  }
}

class shopPage {
  getCartButtons() {
    btn.addEventListener("click", (event) => {
      // { this part should be in the specific product ***
      //get product from products
      let cartItem = { ...Storage.getProductFromLS(id), quantity: 1 }; // quantity should be depended on use choice
      //add product to the cart
      cart = [...cart, cartItem];
      //save the cart in LS
      Storage.saveCart(cart);
      // } ***

      //set cart values
      this.setCartValues(cart);
      //display cartline
      this.addCartline(cartItem);
    });
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.quantity;
      itemsTotal += item.quantity;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  addCartline(cartItem) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img src="${
      productsImages[cartItem.id - 1]
    }" id="product2" alt="product">
        <div class="">
            <h4>${cartItem.title}</h4>
            <h5>$${cartItem.price}</h5>
            <span class="remove-item" data-id=${cartItem.id}>remove</span>
        </div>
        <div class="">
            <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
            <p class="item-amount">${cartItem.quantity}</p>
            <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
        </div>`;
    cartContent.appendChild(div);
  }

  setupApp() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart); // (also adds cart line)
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartline(item));
  }
  cartLogic() {
    const clearCartBtn = document.querySelector(".clear-cart");
    clearCartBtn.addEventListener("click", () => this.clearCart());

    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("plus-button")) {
        let addQuantity = event.target;
        let id = addQuantity.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.quantity += 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addQuantity.nextElementSibling.innerText = tempItem.quantity;
      } else if (event.target.classList.contains("minus-button")) {
        let lowerQuantity = event.target;
        let id = lowerQuantity.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.quantity = tempItem.quantity - 1;
        if (tempItem.quantity > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerQuantity.previousElementSibling.innerText = tempItem.quantity;
        } else {
          cartContent.removeChild(lowerQuantity.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    console.log(cartContent.children);

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
  }
}

/////////////////////////////////////

class Storage {
  static getProductFromLS(id) {
    let productsLS = JSON.parse(localStorage.getItem("products"));
    return (productsLS || []).find((item) => item.id === id);
  }
  // save a product in the local storage with a specific key
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  //save the cart in the local storage with a specific key
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
