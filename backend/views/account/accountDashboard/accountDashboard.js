$.ajax({
  url: "/graph",
  method: "GET",
  success: function (response) {
    $(".graphs").append(response);
  },
  error: function (error) {
    console.error("Error fetching products:", error);
  },
});
