$(function () {
  $("#header").load("/frontend/views/partials/Header/Header.html");
  $("#footer").load("/frontend/views/partials/Footer/Footer.html");
});
// change to the updated header/footer

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

const cartTotal = document.getElementById("cart-total");
let cart = [];
