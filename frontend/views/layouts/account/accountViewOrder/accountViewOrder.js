// $(document).ready(function () {
//   var orderNumber = $("#orderNumber").val();
//   var email = $("#email").val();
//   var paymentMethod = $("#paymentMethod").val();
//   var orderDate = $("#orderDate").val();
//   var deliveryOption = $("#deliveryOption").val();
//   var deliveryAddress = $("#deliveryAddress").val();
//   var contactNumber = $("#contactNumber").val();
//   var orderNotes = $("#orderNotes").val();

//   var productList = [];

//   $("table.table tbody tr").each(function () {
//     var productName = $(this).find("td:first-child").text();
//     var productPrice = $(this).find("td:last-child").text();

//     var product = {
//       name: productName,
//       price: productPrice,
//     };
//     productList.push(product);
//   });

//   console.log("Order Number: " + orderNumber);
//   console.log("Email: " + email);
//   console.log("Payment Method: " + paymentMethod);
//   console.log("Order Date: " + orderDate);
//   console.log("Delivery Option: " + deliveryOption);
//   console.log("Delivery Address: " + deliveryAddress);
//   console.log("Contact Number: " + contactNumber);
//   console.log("Order Notes: " + orderNotes);

//   console.log("Product List:");
//   productList.forEach(function (product) {
//     console.log("Product Name: " + product.name + ", Price: " + product.price);
//   });
// });

// // $(document).ready(function () {
// //   // Function to add a new product row above the existing rows
// //   function addProductRowAboveExisting(productName, productPrice) {
// //     var newProductRow = $("<tr>")
// //       .append($("<td>").text(productName))
// //       .append($("<td>").text(productPrice));

// //     $("table.table tbody").prepend(newProductRow);
// //   }

// //   // Example of adding a new product row dynamically above the existing rows
// //   var newProductName = "Product 4";
// //   var newProductPrice = "$39.99";
// //   addProductRowAboveExisting(newProductName, newProductPrice);
// // });
