function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
$.ajax({
  url: "/partials/Header/Header.html",
  dataType: "html",
  success: function (data) {
    $("#header").html(data);
    loadCSS("/partials/Header/Header.css");
  },
});

$.ajax({
  url: "/partials/Footer/Footer.html",
  dataType: "html",
  success: function (data) {
    $("#footer").html(data);
    loadCSS("/partials/Footer/Footer.css");
  },
});
