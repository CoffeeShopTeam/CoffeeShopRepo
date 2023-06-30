$.ajax({
  url: "/account/navbar",
  method: "GET",
  success: function (response) {
    $(".accountNavBar").append(response);
  },
  error: function (error) {
    console.error("Error fetching products:", error);
  },
});
