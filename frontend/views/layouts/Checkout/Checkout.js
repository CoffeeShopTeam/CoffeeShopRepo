$(function () {
  $("#header").load("/frontend/views/partials/Header/Header.html");
  $("#footer").load("/frontend/views/partials/Footer/Footer.html");
});

function togglePaymentDescription() {
  var paymentMethods = document.getElementsByName("payment-method");
  var descriptions = {
    "credit-card": document.getElementById("credit-card-description"),
    "cash-on-delivery": document.getElementById("cash-on-description"),
    paypal: document.getElementById("paypal-description"),
  };

  for (var i = 0; i < paymentMethods.length; i++) {
    var paymentMethod = paymentMethods[i];
    if (descriptions.hasOwnProperty(paymentMethod.value)) {
      descriptions[paymentMethod.value].style.display = paymentMethod.checked
        ? "block"
        : "none";
    }
  }
}
