$(function () {
  $(".btn.delete").each(function (i, btn) {
    $(btn).on("click", async function (event) {
      const userId = event.target.value;
      console.log(event.target.value);
      $.ajax({
        url: `/account/${userId}`,
        method: "DELETE",
        success: function (response) {
          // window.location.href = "/account/users/";
        },
        error: function (error) {
          console.error("Error fetching users:", error);
        },
      });
    });
  });

  // $(".btn.edit").each(function (i, btn) {
  //     $(btn).on('click', function (event) {
  //         const productId = event.target.value;
  //         console.log(productId);
  //         $.ajax({
  //             url: `/product/${productId}`,
  //             method: "GET",
  //             success: function (response) {
  //                 console.log(response);
  //             },
  //             error: function (error) {
  //                 console.error("Error fetching products:", error);
  //             },
  //         });
  //     })
  // })

  // $("#editForm").on("submit", function (event) {
  //   console.log(event.target.value);
  // });
});
