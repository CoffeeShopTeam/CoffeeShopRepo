function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
$.ajax({
  url: "/account/account.html",
  dataType: "html",
  success: function (data) {
    $("#accountNavBar").html(data);
    loadCSS("/account/account.css");
  },
});

$(document).ready(function () {
  function changeViewByUserType(userType) {
    $("#accountDetails").hide();
    $("#accountOrders").hide();
    $("#accountWishlist").hide();
    $("#accountProducts").hide();
    $("#accountPermission").hide();

    if (userType === "admin") {
      $("#accountDetails").show();
      $("#accountOrders").show();
      $("#accountProducts").show();
      $("#accountPermission").show();
    } else if (userType === "supplier") {
      $("#accountDetails").show();
      $("#accountOrders").show();
      $("#accountProducts").show();
    } else if (userType === "customer") {
      $("#accountDetails").show();
      $("#accountOrders").show();
      $("#accountWishlist").show();
    }
  }
  console.log(poty);
  changeViewByUserType(poty);
});
