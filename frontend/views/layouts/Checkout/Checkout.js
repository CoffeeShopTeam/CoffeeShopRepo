$(function () {
  $("#header").load("/frontend/views/partials/Header/Header.html");
  $("#footer").load("/frontend/views/partials/Footer/Footer.html");
});

$(document).ready(function () {
  $(".selection").hide();
  $('input[name="payment-method"]').each(function (index, element) {
    $(element).on("click", function () {
      var descriptionId = "#" + $(this).val() + "-description";
      $(".selection").hide();
      $(descriptionId).show();
    });
  });
});
