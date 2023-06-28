// $(document).ready(function () {
//   $("#header").load("/frontend/views/partials/Header/Header.html");
//   $("#footer").load("/frontend/views/partials/Footer/Footer.html");
// });

// const { ajax } = require("jquery");

$(document).ready(function () {
  $(".selection").hide();
  $('input[name="payment-method"]').each(function (index, element) {
    $(element).on("click", function () {
      let descriptionId = "#" + $(this).val() + "-description";
      $(".selection").hide();
      $(descriptionId).show();
    });
  });

  $('#currency-conversion-form').on('submit', function(event) {
    event.preventDefault();
    console.log('hi');
    // const allProducts = $('.d-flex.justify-content-between.align-items-center.mb-2')
    // allProducts.each(function(i, product) {
    //   const price = this.find('h5').attr('data-amount');
    //   const currency = this.find('.currency-symbol').attr('currency-select');
    //   console.log(price, currency);

    // });
  })
  
    // $('convert-button').on('click', async function(event) {
    // event.preventDefault(); // Prevent the default form submission
    // const allProducts = $('.d-flex.justify-content-between.align-items-center.mb-2')
    // allProducts.each(function(i, product) {
    //   const price = this.find('h5').attr('data-amount');
    //   const currency = this.find('.currency-symbol').attr('currency-select');
    //   console.log(price, currency);

    // });

    
    // Get the selected currency and the data amount for this form
    // let currency = $(this).find('.currency-select').val();
    // let amount = $(this).find('.data-amount').val();
    // // window.location.href = '/checkout/exchange'    
    //   const res = await axios.post('/test/', {
    //     currency,
    //     anomunt
    //   })

  });
  // });


// $(document).ready(function() {
//   // Handle form submission
//   $('.currency-form').submit(function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get the selected currency and the data amount for this form
//     var currency = $(this).find('.currency-select').val();
//     var amount = $(this).find('.data-amount').val();

//     // Reference to the current form for updating the converted amount
//     var $form = $(this);

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

//         // Update the converted amount in the same place as data amount
//         var convertedAmount = response.convertedAmount;
//         $form.find('.data-amount').val(convertedAmount);
//       },
//       error: function(error) {
//         // Handle any errors that occur during the API request
//         console.log(error);
//       }
//     });
//   });
// });

