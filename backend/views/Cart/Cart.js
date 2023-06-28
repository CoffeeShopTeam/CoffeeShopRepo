$(function () {
  $("#header").load("/backend/views/partials/Header/Header.html");
  $("#footer").load("/backend/views/partials/Footer/Footer.html");
});

import jsonProducts from "./assets/products.json";
const jsonProducts = [product1, product2];
const cartItems = document.getElementById("cart-items");
const cartContent = document.getElementById("cart-content");
const cartTotal = document.getElementById("cart-total");
localStorage.setItem("jsonProducts", jsonProducts);
let cart = [];

class Products {
  static getProducts() {
    console.log("Getting products..");
    return jsonProducts.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
  }
}

// class CartPage {
//   static setCartValues(cart) {
//     let countTotal = 0; // Count the item prices
//     let itemsTotal = 0; // How many products are there

//     cart.forEach((item) => {
//       countTotal += item.price * item.quantity;
//       itemsTotal += item.quantity;
//       const div = document.createElement("div");
//     });

//     cartItems.innerText = itemsTotal;
//     const cartTotal = parseFloat(countTotal.toFixed(2));
//     $("#cart-total").text(cartTotal);
//   }

//   static addCartline(cartItem) {
//     const newProduct = $("<div>").addClass("cart-items");
//     newProduct.html(`<img src="${cartItem.image}" id="product${cartItem.id}" alt="productImage">
//     <div class="">
//         <h4>${cartItem.title}</h4>
//         <h5>$${cartItem.price}</h5>
//         <span class="remove-item" data-id=${cartItem.id}>remove</span>
//     </div>
//     <div class="">
//         <i class="plus-button" data-id=${cartItem.id}></i>
//         <p class="item-amount">${cartItem.quantity}</p>
//         <i class="minus-button" data-id=${cartItem.id}></i>
//     </div>`);
//     $("#cart-content").append(newProduct);
//   }

//   static populateCart(cart) {
//     cart.forEach((item) => this.addCartline(item));
//   }

//   static setupApp() {
//     cart = Storage.getCart();
//     this.setCartValues(cart);
//     this.populateCart(cart);
//   }

//   static removeItem(id) {
//     cart = cart.filter((item) => item.id !== id);
//     this.setCartValues(cart);
//     Storage.saveCart(cart);
//   }

//   static clearCart() {
//     cart = [];
//     this.setCartValues(cart);
//     Storage.saveCart(cart);
//     while (cartContent.firstChild) {
//       cartContent.removeChild(cartContent.firstChild);
//     }
//   }

//   static cartLogic() {
//     const clearCartBtn = document.querySelector(".clear-cart");
//     clearCartBtn.addEventListener("click", () => this.clearCart());

//     cartContent.addEventListener("click", (event) => {
//       if (event.target.classList.contains("remove-item")) {
//         const removeItem = event.target;
//         const id = parseInt(removeItem.dataset.id);
//         cartContent.removeChild(removeItem.parentElement.parentElement);
//         this.removeItem(id);
//       } else if (event.target.classList.contains("plus-button")) {
//         const addQuantity = event.target;
//         const id = parseInt(addQuantity.dataset.id);
//         const tempItem = cart.find((item) => item.id === id);
//         tempItem.quantity += 1;
//         Storage.saveCart(cart);
//         this.setCartValues(cart);
//         addQuantity.nextElementSibling.innerText = tempItem.quantity;
//       } else if (event.target.classList.contains("minus-button")) {
//         const lowerQuantity = event.target;
//         const id = parseInt(lowerQuantity.dataset.id);
//         const tempItem = cart.find((item) => item.id === id);
//         tempItem.quantity -= 1;
//         if (tempItem.quantity > 0) {
//           Storage.saveCart(cart);
//           this.setCartValues(cart);
//           lowerQuantity.previousElementSibling.innerText = tempItem.quantity;
//         } else {
//           cartContent.removeChild(lowerQuantity.parentElement.parentElement);
//           this.removeItem(id);
//         }
//       }
//     });
//   }
// }

// /////////////////////////////////////
