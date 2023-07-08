$(function () {
  $(".btn.delete").each(function (i, btn) {
    $(btn).on("click", async function (event) {
      const productId = event.target.value;
      console.log(productId);
      $.ajax({
        url: `/product/${productId}`,
        method: "DELETE",
        success: function (response) {
          window.location.href = "/account/products/";
        },
        error: function (error) {
          console.error("Error fetching products:", error);
        },
      });
    });
  });

  function viewCurrentProductToEdit(data) {
    localStorage.setItem("editProduct", data._id);
    $("#editProductName").val(data.productName);
    $("#editProductBrand").val(data.productBrand);
    $("#editProductPrice").val(data.productPrice);
    $("#editProductQuantity").val(data.productQuantity);
    $("#editProductDescription").val(data.productDescription);
    $("#editProductCategory").val(data.productCategory);
  }

  $(".btn.edit").each(function (i, btn) {
    $(btn).on("click", function (event) {
      const productId = event.target.value;
      $.ajax({
        url: `/product/${productId}`,
        method: "GET",
        success: function (data) {
          console.log(data);
          viewCurrentProductToEdit(data);
        },
        error: function (error) {
          console.error("Error fetching products:", error);
        },
      });
    });
  });

  $("#editForm").on("submit", function (event) {
    event.preventDefault();
    const form = $(this);
    let data = $(form).serialize();
    const files = $("#editProductImage").prop("files");
    const productId = localStorage.getItem("editProduct");
    if (files?.[0]?.name) {
      data = `${data}&productImage=${files?.[0]?.name}`;
    }

    $.ajax({
      url: `/product/${productId}/`,
      method: "PUT",
      data: data,
      success: function (response) {
        window.location.href = "/account/products/";
      },
      error: function (error) {
        console.error("Error fetching products:", error);
      },
    });
  });
});

$(document).ready(function () {
  $(".plus-button").hover(
    function () {
      $(this).css("background-color", "black");
      $(this).css("color", "white");
    },
    function () {
      $(this).css("background-color", "");
      $(this).css("color", "");
    }
  );
});
