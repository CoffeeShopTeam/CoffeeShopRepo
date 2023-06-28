function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
$.ajax({
  url: "/frontend/views/layouts/account/account.html",
  dataType: "html",
  success: function (data) {
    $("#accountNavBar").html(data);
    loadCSS("/frontend/views/layouts/account/account.css");
  },
});
