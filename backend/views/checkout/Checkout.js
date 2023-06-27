$(function () {
  $("#header").load("/frontend/views/partials/Header/Header.html");
  $("#footer").load("/frontend/views/partials/Footer/Footer.html");
});

$(function () {
  $(".selection").hide();
  $('input[name="payment-method"]').each(function (index, element) {
    $(element).on("click", function () {
      var descriptionId = "#" + $(this).val() + "-description";
      $(".selection").hide();
      $(descriptionId).show();
    });
  });
});

$(function () {
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

// $(document).ready(function() {
//   // Handle form submission
//   $('#currency-form').submit(function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get the selected currency and the hardcoded amount
//     var currency = $('#currency').val();
//     var amount = 380;
//     console.log(`currency chosen is ${currency}`);
//     // Send the data to the exchange rate API
//     $.ajax({
//       url: $(this).attr('action'),
//       method: 'POST',
//       data: {
//         currency: currency,
//         amount: amount
//       },
//       success: function(response) {
//         // Handle the API response here
//         console.log(response);
//       },
//       error: function(error) {
//         // Handle any errors that occur during the API request
//         console.log(error);
//       }
//     });
//   });
// });

