function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
$.ajax({
  url: "/account/navbar",
  dataType: "html",
  success: function (data) {
    $("#accountNavBar").html(data);
    loadCSS("/account/account.css");
  },
});
