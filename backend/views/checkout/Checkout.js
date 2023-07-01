const { getAllProducts } = require("../../controller/products/products.controller");

$(function () {
    $("#currency-conversion-form").on("submit", async function (e) {
    e.preventDefault();
    const targetCurrency = $("#currency").val();
    const allProducts = $(
        ".d-flex.justify-content-between.align-items-center.mb-2.product"
    );
    allProducts.each(async function (i, product) {
        const amount = $(product).find("h5").attr("data-amount");
        const baseCurrency = $(product).find("span").attr("currency-select");
        try {
        // Fetch exchange rate
        const res = await axios.get(`/checkout/exchange/`, {
            params: {
            baseCurrency,
            targetCurrency,
            amount,
        },
        });
        const data = res.data;
        $(product).find("span").attr("currency-select", data.current);
        $(product).find("h5").attr("data-amount", data.convertedAmount);
        $(product)
        .find(".currency-symbol")
        .text(function () {
            return `${data.convertedAmount} ${data.currencySymbol}`;
        });
        } catch (error) {
        console.error("Error performing currency conversion:", error);
        }
    });
});

$(".container").on("submit", function (event) {
    let orderPrice = $('h5[name="orderPrice"]').data("amount");
    $("<input>")
        .attr({
        type: "hidden",
        name: "orderPrice",
        value: orderPrice,
        })
    .appendTo($(this));
});
});

$(document).ready(function () {
    let checkoutProducts = JSON.parse(localStorage.getItem("jsonProducts"));
    console.log(checkoutProducts);
    cart = getProducts();
    populateCheckout(cart);
    setTotalValue(cart);

    function populateCheckout(cart) {
    $(".product-container").remove();
    if (cart === null) {
        return;
    }
    cart.forEach(function (item) {
    addProductLine(item);
    });
}

    function getProducts() {
        let cart = JSON.parse(localStorage.getItem("jsonProducts"));
        return cart;
    }

    function addProductLine(cartItem) {
    let item = $("#checkout-product");
    const newItem = $(
        "<div class='d-flex justify-content-between align-items-center mb-2 product'>"
    );
    newItem.html(`
        <h5 class="mb-0" data-amount="${cartItem.price * cartItem.quantity} id="cartItem">${cartItem.title}</h5>
        <p id="quantity" name="quantity">${cartItem.quantity}</p>
        <span class="currency-symbol" currency-select="ILS">${(
        cartItem.price * cartItem.quantity
    ).toFixed(2)}₪</span>
    </div>
    <hr class="mb-3" />
    `);
    item.append(newItem);
    setTotalValue(cart);
}

function setTotalValue(cart) {
    let countTotal = 0;
    if (cart === null) {
        countTotal = 0.0;
        let cartTotalContainer = $("#checkout-total");
        cartTotalContainer.html(`
        <div class="d-flex justify-content-between align-items-center mb-2 product">
            <h5 class="checkout-total mb-0" data-amount="${countTotal.toFixed(2)}" name="orderPrice">TOTAL</h5>
            <span class="currency-symbol" currency-select="ILS">${countTotal.toFixed(2)}₪</span>
        </div>`);
    } else {
        cart.forEach(function (item) {
        countTotal += item.price * item.quantity;
    });
        let cartTotalContainer = $("#checkout-total");
        cartTotalContainer.html(`
        <div class="d-flex justify-content-between align-items-center mb-2 product">
            <h5 class="checkout-total mb-0" data-amount="${countTotal.toFixed(
            2
            )}" name="orderPrice">TOTAL</h5>
            <span class="currency-symbol" currency-select="ILS">${countTotal.toFixed(
            2
            )}₪</span>
        </div>
        `);
    }
}

function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    if ($(this).attr('id') !== 'place-order-button') {
      return; // Do nothing if it's not the "Place Order" button
    }

    let elements = $('label');

    let formData = {};

    // Loop through each element and add its value to the formData object
    elements.each(function(index, element) {
      let name = $(element).attr('for'); // Get the "for" attribute value of the label
      let value = $('#' + name).val(); // Get the value of the corresponding input field
      formData[name] = value; // Add the value to the formData object
    });
    let product = "product";
    let products = getAllProducts()
    formData[product] = products
    
    // Make the AJAX request
    $.ajax({
        url: '/orders',
        type: 'POST',
        data: formData,
        contentType: 'application/json',
        success: function(response) {
        console.log('Order placed successfully.');
    },
        error: function(error) {
        console.log('Error placing the order.');
            }
        });
}

$('#place-order-button').on('submit', submitForm);

});

