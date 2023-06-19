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

$(document).ready(function () {
  const selectElement = $(".countrySelect");
  let i = 0;
  const CountryArray = [];
  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    method: "GET",
    success: function (response) {
      response.forEach(function (country) {
        CountryArray.push(country.name.common);
      });
      CountryArray.sort();
      CountryArray.forEach(function (countryName) {
        const option = $("<option></option>");
        option.val(countryName);
        option.text(countryName);
        if (countryName === "Israel") {
          option.attr("selected", true);
        }
        selectElement.append(option);
      });
    },
    error: function () {
      console.log("Failed to fetch country data");
    },
  });
});
